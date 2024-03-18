import axios from "axios";

const PORT = 9999;
const axiosInstance = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

export default axiosInstance;
