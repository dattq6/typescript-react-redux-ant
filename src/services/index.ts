import { AxiosRequestConfig } from "axios";
import APIs, { ApiMethod, ApiName } from "./api";
import { post, get, put, patch, del } from "./http";
const apiService = (apiName: ApiName, params?: Array<string>) => {
  let { url, verb, args } = APIs.methods[apiName];
  type ArgType = { [param in typeof args[number]]: any };
  if (params) {
    url = urlBuilder(url, params);
  }
  return (payload?: ArgType, config?: AxiosRequestConfig) => {
    switch (verb) {
      case "GET":
        return get<ArgType>(url, payload, config);
      default:
        return preAction<ArgType>(verb, url, payload);
    }
  };
};

const preAction = async <T>(verb: ApiMethod, url: string, payload?: T, config?: AxiosRequestConfig) => {
  let newConfig = config;
  if (!url.includes("/api/v1/entrance") && !url.includes("/api/v1/join-waitlist")) {
    const tokenUrl = APIs.methods["grantCsrfToken"].url;
    const response = await get(tokenUrl);
    newConfig = {
      ...(config || {}),
      headers: { "X-CSRF-Token": response.data._csrf },
    } as AxiosRequestConfig;
  }
  switch (verb) {
    case "PUT":
      return put<T>(url, payload, newConfig);
    case "PATCH":
      return patch<T>(url, payload, newConfig);
    case "DELETE":
      return del<T>(url, payload, newConfig);
    default:
      return post<T>(url, payload, newConfig);
  }
};

const urlBuilder = (url: string, params: Array<string>) => {
  const urlSplit = url.split("/");
  let count = 0;
  let result = "";
  urlSplit.forEach((item) => {
    if (item.includes(":")) {
      result += `/${params[count]}`;
      count += 1;
    } else {
      result += `/${item}`;
    }
  });
  return result;
};

export default apiService;
