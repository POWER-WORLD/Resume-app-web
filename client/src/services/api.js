import axios from "axios";

// // for server deployment
// const api = axios.create({
//   baseURL: "https://resume-app-webserver-production.up.railway.app/api", // backend base URL
// });


//for local development
const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL for local development
});



// attach auth header from localStorage for requests
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('authUser');
    if (raw) {
      const user = JSON.parse(raw);
      if (user && user.token) config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

export default api;
