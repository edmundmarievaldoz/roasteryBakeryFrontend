import { useState, useEffect } from "react";
import API from "./API.js";


const useLoad = (loadEndpoint) => {
    //state......................
    const [records, setRecords] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState("Loading records...")

    const loadRecords = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess ? setRecords(response.result) : setLoadingMessage(response.message); //
    };

    useEffect(() => {
    loadRecords(loadEndpoint);
    }, [loadEndpoint]);

    //return.............................

    return [records, loadingMessage, loadRecords]; {/**we will force reload our state, hence returning it */}
};

export default useLoad;