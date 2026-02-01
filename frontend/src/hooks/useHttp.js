import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || 'Something went wrong, failed to send request')
  }

  return resData;
}
function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState();

  function clearCartData() {
    setData(initialData)
  }
  
  const sendRequest = useCallback(async function sendRequest(data) {
    setIsLoading(true);

    try {
      const resData = await sendHttpRequest(url, {...config, body: data})
      setData(resData)
    } catch (error) {
      setError(error.message || 'Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }, [config, url])

  useEffect(() => {
    if (!config || !config.method || config.method === 'GET') {
      sendRequest();
    }
  }, [config, sendRequest])

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearCartData,
  }
}

export default useHttp;