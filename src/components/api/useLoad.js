import { useState, useEffect } from "react";
import API from "./API.js";


const useLoad = (loadEndpoint) => {
    //state......................
    const [records, setRecords] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState("Loading records...")
    const [errorStatus, setErrorStatus] = useState(null); // HTTP status of a failed load, e.g. 404

    const loadRecords = async (endpoint) => {
    const response = await API.get(endpoint);
    if (response.isSuccess) {
        setRecords(response.result);
        setErrorStatus(null);
    } else {
        setLoadingMessage(response.message);
        setErrorStatus(response.status);
    }
    };

    useEffect(() => {
    loadRecords(loadEndpoint);
    }, [loadEndpoint]);

    //return.............................

    return [records, loadingMessage, loadRecords, errorStatus];{/**we will force reload our state, hence returning it */}
};

export default useLoad;