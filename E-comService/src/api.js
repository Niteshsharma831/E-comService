import axios from "axios";

const API = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:3000/api"
      : "https://e-comservice.onrender.com/api",
  withCredentials: true,
});

export default API;
