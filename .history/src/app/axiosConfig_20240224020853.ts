import axios from "axios";
const axiosConfig = axios.create({
  baseURL: "https://epicbazaar.onrender.com/",
});

export default axiosConfig;
