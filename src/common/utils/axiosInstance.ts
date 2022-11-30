import axios from "axios";

const axiosQuery = axios.create({
  headers: {
    "x-api-key": process.env.REACT_APP_API_KEY,
  },
  withCredentials: false,
  baseURL: process.env.REACT_APP_API_URL,
});

export default axiosQuery;
