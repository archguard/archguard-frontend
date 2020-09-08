import { notification } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { util as loadingUtil } from "../components/Loading";

const instance = axios.create({
  baseURL: '',
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
instance.interceptors.request.use((config) => {
  loadingUtil.increase();
  return config;
}, handleError);

// response 拦截器
instance.interceptors.response.use((response) => {
  loadingUtil.reduce();
  return response.data;
}, handleError);

export default async function axiosAgent<T>(config: AxiosRequestConfig) {
  const res = await instance(config);
  return (res as unknown) as T;
}

export const axiosWithBaseURL = (baseURL: string) => <T>(config: Omit<AxiosRequestConfig, 'baseURL'>) => axiosAgent({ ...config, baseURL }) as unknown as Promise<T>;
