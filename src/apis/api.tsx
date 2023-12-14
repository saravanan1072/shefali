import axiosInstance from "./config/axiosInstance";

// TODO: make use of typescript generics here, instead of any

export const get = (
  url: string,
  queryParams?: Record<any, any>,
  headers?: any
): Promise<any> => {
  let config = headers
    ? { headers: headers, params: queryParams, }
    : { params: queryParams };
  return axiosInstance.get(url, config);
};

export const post = (
  url: string,
  body?: Record<any, any>,
  queryParams?: Record<any, any>
): Promise<any> => {
  return axiosInstance.post(url, body, { params: queryParams });
};

export const put = (
  url: string,
  body: Record<any, any>,
  queryParams?: Record<any, any>
): Promise<any> => {
  return axiosInstance.put(url, body, queryParams);
};

export const patch = (
  url: string,
  body: Record<any, any>,
  queryParams?: Record<any, any>
): Promise<any> => {
  return axiosInstance.patch(url, body, queryParams);
};

export const del= (
  url: string,
  body: Record<any, any>
): Promise<any> => {
  return axiosInstance.delete(url, body);
};

