import { notification } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { util as loadingUtil } from "../components/Loading";
import { useState, useEffect } from 'react';

const axiosInstance = axios.create({
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
  return axiosInstance(config) as unknown as Promise<T>;
}

export const axiosWithBaseURL = (baseURL: string) => <T>(config: Omit<AxiosRequestConfig, 'baseURL'>) => axiosAgent({ ...config, baseURL }) as unknown as Promise<T>;


interface UseGetOption {
  manual?: boolean;//是否手动触发，若为 true，即组件加载时不会触发请求
}

export function useGet<T>(url: string, option?: UseGetOption) {
  const [data, setData] = useState<T>();
  const run = (params?: { [p: string]: any; }) => {
    axiosInstance.get<string, T>(url, { params }).then(res => setData(res));
  };
  useEffect(() => { if (!option?.manual) { run(); } }, []);
  return { data, run };
}