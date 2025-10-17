
import axios from "axios";

export const BaseURL = import.meta.env.VITE_BASE_URL_DEV;

export const API = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});