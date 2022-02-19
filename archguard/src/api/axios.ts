import { notification } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { util as loadingUtil } from "../components/Business/Loading";

export const axiosInstance = axios.create({
  baseURL: "",
  timeout: 60000, // 请求超时时间
  withCredentials: true, // 允许跨域携带cookie
});

const handleError = (error: any) => {
  loadingUtil.reduce();
  const message = error?.response?.data?.message ?? error.message;
  notification.error({
    message: message,
    duration: 0,
  });
  return Promise.reject(error);
};

// request 拦截器
axiosInstance.interceptors.request.use((config) => {
  loadingUtil.increase();
  return config;
}, handleError);

// response 拦截器
axiosInstance.interceptors.response.use((response) => {
  loadingUtil.reduce();
  return response.data;
}, handleError);

export default function axiosAgent<T>(config: AxiosRequestConfig) {
  return (axiosInstance(config) as unknown) as Promise<T>;
}

export const axiosWithBaseURL = (baseURL: string) => <T>(
  config: Omit<AxiosRequestConfig, "baseURL">,
) => (axiosAgent({ ...config, baseURL }) as unknown) as Promise<T>;
