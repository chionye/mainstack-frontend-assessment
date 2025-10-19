/** @format */

import axios from "axios";
import { BASE_URL } from "@/constants/endpoints";

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});