import React, { useEffect, useState } from 'react'
import axios from "../services/axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url); 
        setData(response.data);
      } catch (error) {
        const errorMessage =  error.response?.data?.message??error.response?.statusText??error.message ; 
        setError(errorMessage);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      const errorMessage =  error.response?.data?.message??error.response?.statusText??error.message ; 
      setError(errorMessage);
    }
    setLoading(false);
  };  
  return { data, loading, error, reFetch };
}

export default useFetch
