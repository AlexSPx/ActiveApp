import axios, { HttpStatusCode, isAxiosError } from "axios";
import { API_ADDRESS } from "../utils/conf";  

export type ErrorResponse = {
  error: string;
  message: string;
  status: HttpStatusCode;
};

export const axiosInstance = axios.create({
  baseURL: API_ADDRESS,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceAuth = axios.create({
  baseURL: API_ADDRESS,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleError = (error: any): ErrorResponse => {
  if (isAxiosError(error) && error.response) {
    if (error.status === HttpStatusCode.ServiceUnavailable) {
      return {
        error: "Service unavailable",
        message: "Service unavailable",
        status: error.status,
      };
    }
    return error.response.data;
  } else {
    return {
      error: "Error",
      message:
        error && error.message
          ? error.message
          : "Something unexpected happened",
      status: HttpStatusCode.BadGateway,
    };
  }
};
