import axios from "axios";
import { notification } from "antd";
import Loading from "components/Loading";

const instance = axios.create({
  baseURL: "",
  timeout: 60000, // 请求超时时间
  withCredentials: true, // 允许跨域携带cookie
});

const err = (error) => {
  Loading.reduceCount();
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message;

  notification.error({
    message: message,
    duration: 0,
  });
  return Promise.reject(error);
};

// request 拦截器
instance.interceptors.request.use((config) => {
  Loading.addCount();
  return config;
}, err);

// response 拦截器
instance.interceptors.response.use((response) => {
  Loading.reduceCount();
  return response.data;
}, err);

export default instance;
