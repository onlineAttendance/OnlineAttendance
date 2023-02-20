import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      console.log("Req URL : ",requestConfig.url );
      console.log("Req method : ",requestConfig.method );
      console.log("Req header : ",requestConfig.headers );
      console.log("Req body : ",requestConfig.body );
      
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers
          ? requestConfig.headers
          : { "Content-Type": "application/json" },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      console.log("response: ",response);
      const data = await response.json();
      console.log("Data: ",data);
      await applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
