import axios from "../axios";
import { baseURL } from './config'

export function scanDependence() {
  return axios({
    baseURL: baseURL,
    url: '/dependency-analyses',
    method: "POST",
    timeout: 180000, // 请求超时时间
  });
}
