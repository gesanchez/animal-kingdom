import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
  headers: { "Content-Type": "application/json" }
});

export default http;
