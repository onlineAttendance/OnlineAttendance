import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    console.log(
      requestConfig.url,
      requestConfig.headers,
      requestConfig.method,
      requestConfig.body
    );
    try {
      console.log("Req URL : ", requestConfig.url);
      console.log("Req method : ", requestConfig.method);
      console.log("Req header : ", requestConfig.headers);
      console.log("Req body : ", requestConfig.body);
      const baseURL = "https://sungam.site";
      const response = await fetch(`${baseURL}${requestConfig.url}`, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers
          ? requestConfig.headers
          : { "Content-Type": "application/json" },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      console.log("response: ", response);
      const data = await response.json();
      console.log("Data: ", data);
      await applyData(data);

      if (response.status == 400 || 401 || 402 || 403) {
        setError(data.message);
        setErrorCode(data.code);
        throw new Error("Request failed!");
      }
    } catch (err) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    errorCode,
    error,
    sendRequest,
  };
};

export default useHttp;
