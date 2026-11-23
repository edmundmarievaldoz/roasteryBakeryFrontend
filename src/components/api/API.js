const API = {};

API.get = (endpoint) => callFetch(endpoint, 'GET'); //reading and rendering
API.post = (endpoint, record) => callFetch(endpoint, 'POST', record); // posting or adding new records
API.put = (endpoint, record) => callFetch(endpoint, 'PUT', record); //modifying record
API.delete = (endpoint) => callFetch(endpoint, 'DELETE'); // deleting records

//below is our helper function...
// It never throws: it always resolves to
//   { isSuccess: true, result }  or  { isSuccess: false, status, message }
const callFetch = async (endpoint, method, record = null) => {
    // Build a request object
    const request = { method };
    if (record) {
        request.body = JSON.stringify(record);
        request.headers = { 'Content-Type': 'application/json' };
    }

    // 1. Call the server. fetch only throws when the server cannot be reached.
    let response;
    try {
        response = await fetch(endpoint, request);
    } catch {
        return {
            isSuccess: false,
            status: null,
            message: 'Could not reach the server. Please try again later.',
        };
    }

    // 2. Read the body. 204 has no body, and an HTML error page is not JSON,
    //    so response.json() can throw. In that case result stays null.
    let result = null;
    if (response.status !== 204) {
        try {
            result = await response.json();
        } catch {
            result = null;
        }
    }

    // 3. Success (200-299)
    if (response.ok) {
        if (result === null && response.status !== 204) {
            return {
                isSuccess: false,
                status: response.status,
                message: 'The server sent an unexpected response.',
            };
        }
        return { isSuccess: true, result };
    }

    // 4. Error: use the backend's { message }, or a general one if there is none
    return {
        isSuccess: false,
        status: response.status,
        message: result?.message ?? `Something went wrong (error ${response.status}).`,
    };
};

export default API;
