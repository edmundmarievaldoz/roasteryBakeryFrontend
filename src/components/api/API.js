const API = {};

API.get = (endpoint) => callFetch(endpoint, 'GET'); //reading and rendering
API.post = (endpoint, record) => callFetch(endpoint, 'POST', record); // posting or adding new records
API.put = (endpoint, record) => callFetch(endpoint, 'PUT', record); //modifying record
API.delete = (endpoint) => callFetch(endpoint, 'DELETE'); // deleting records

//below is our helper function... 
const callFetch = async (endpoint, method, record = null) => {
    // Build a request object
    const request = { method };
    if  (record) {
        request.body = JSON.stringify(record);
        request.headers = { 'Content-Type' : 'application/json' };
    }

    // Call the Fetch
    let result = null;
    const response = await fetch(endpoint, request);
    if (response.status !== 204) result = await response.json();

    return response.status >= 200 && response.status < 300
        ? {isSuccess: true, result }
        : {isSuccess: false, message: result.message};
};

export default API;