import axios from "axios";

const api = axios.create({
  baseURL: "https://resume-app-webserver-production.up.railway.app/api", // backend base URL
});

export default api;
