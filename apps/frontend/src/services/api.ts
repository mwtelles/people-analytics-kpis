import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

console.log("🔧 [API CONFIG] VITE_BACKEND_URL =", import.meta.env.VITE_BACKEND_URL);
console.log("🔧 [API CONFIG] baseURL em uso   =", baseURL);

export const api = axios.create({
  baseURL,
});
