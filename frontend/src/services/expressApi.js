import axios from "axios";

import { EXPRESS_API } from "../constants/config";

const expressApi = axios.create({
  baseURL: EXPRESS_API,

  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT Token
expressApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default expressApi;
