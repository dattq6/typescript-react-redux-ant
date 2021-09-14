import Axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { delay } from "../utils";

const axiosOptions = {
  baseURL: process.env.REACT_APP_URL || "http://localhost:3000",
  // withCredentials: true,
  // headers: {
  //   accept: "application/json",
  // },
};
const axios = Axios.create(axiosOptions);
const request = async (req: Partial<Request>, config: AxiosRequestConfig = {}) => {
  if (!req.url) {
    console.error(`Path is required.`);
  }
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(config?.headers || {}),
    };
    const axiosRequestConfig: AxiosRequestConfig = {
      ...config,
      headers,
      method: req.method as Method,
      url: req.url,
    };
    const [axiosResponse] = await Promise.all([axios(axiosRequestConfig), delay()]);
    return { ...axiosResponse };
  } catch (error) {
    const { response } = error as AxiosError;
    if (response) throw response;
    throw error;
  }
};

export const get = async <T>(url: string, data?: T, axiosConfig: AxiosRequestConfig = {}) => {
  const config = data ? { data, ...axiosConfig } : { ...axiosConfig };
  return request({ url, method: "GET" }, config);
};

export const post = async <T>(url: string, data?: T, axiosConfig: AxiosRequestConfig = {}) => {
  const config = data ? { data, ...axiosConfig } : { ...axiosConfig };
  return request({ url, method: "POST" }, config);
};

export const put = async <T>(url: string, data?: T, axiosConfig: AxiosRequestConfig = {}) => {
  const config = data ? { data, ...axiosConfig } : { ...axiosConfig };
  return request({ url, method: "PUT" }, config);
};

export const patch = async <T>(url: string, data?: T, axiosConfig: AxiosRequestConfig = {}) => {
  const config = data ? { data, ...axiosConfig } : { ...axiosConfig };
  return request({ url, method: "PATCH" }, config);
};

export const del = async <T>(url: string, data?: T, axiosConfig: AxiosRequestConfig = {}) => {
  const config = data ? { data, ...axiosConfig } : { ...axiosConfig };
  return request({ url, method: "DELETE" }, config);
};

type ResponseInterceptors = {
  onUnauthenticated?: (data: any) => void;
  onServerError?: (error: { status: number; message: string }) => void;
};
export const setupAxiosInterceptors = ({
  onUnauthenticated = () => {},
  onServerError = () => {},
}: ResponseInterceptors) => {
  const onResponseSuccess = (response: any) => response;
  const onResponseFailure = (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status && status === 401) {
      onUnauthenticated(data);
    }

    if (status && status === 404) {
      console.log(error);
    }

    // for 500 errors
    if (status && status <= 504 && status >= 500) {
      onServerError({ status, message: data?.data });
    }
    return Promise.reject({
      status,
      data,
      statusText: error.response?.statusText,
    });
  };

  axios.interceptors.response.use(onResponseSuccess, onResponseFailure);
};
