import axios from "axios";

const api = axios.create({
  baseURL: "https://resume-app-web-production.up.railway.app/api", // backend base URL
});

export default api;
