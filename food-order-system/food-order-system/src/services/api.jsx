// api.js

import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Adjust base URL as per your backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
