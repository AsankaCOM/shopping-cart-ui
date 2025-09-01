import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.error ||
            'Request failed — Something went wrong while sending the request. Please try again.');
    }

    return resData;
}

export default function useHttp(url, getConfig, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoarding, setIsLoarding] = useState(false);
    const [error, setError] = useState();

    const config = getConfig();

    const sendRequest = useCallback(
        async function sendRequest(data) {

            setIsLoarding(true)
            try {
                const resData = await sendHttpRequest(url, { ...config, body: data });

                setData(resData)
            } catch (error) {
                setError(error.message || 'Something went wrong!')
            }
            setIsLoarding(false)
        }, [url, getConfig]);


    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method) || !config) {
            sendRequest();
        }
    }, [sendRequest, getConfig]);

    return {
        data,
        isLoarding,
        error,
        sendRequest
    }
}
