import axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL;

const service = axios.create({
  baseURL: `${baseURL}/api/`,
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = "en";
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = `Bearer`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
