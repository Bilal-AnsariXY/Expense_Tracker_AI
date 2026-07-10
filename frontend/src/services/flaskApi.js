import axios from "axios";

const flaskApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FLASK_API,
});

flaskApi.interceptors.request.use(
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

export default flaskApi;
