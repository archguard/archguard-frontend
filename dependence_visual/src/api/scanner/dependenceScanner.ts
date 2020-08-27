import { baseURL } from './config';
import axios from "../axios";

export function scanDependence() {
  return axios({
    baseURL,
    url: '/dependency-analyses',
    method: "POST",
    timeout: 180000, // 请求超时时间
  });
}
