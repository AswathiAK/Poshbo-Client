import axios from "axios";
import { baseUrl } from "../constants";
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: baseUrl,
   withCredentials: true
});

instance.interceptors.request.use(
  (config) => {
  const userToken = Cookies.get('userToken');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
  
export default instance;