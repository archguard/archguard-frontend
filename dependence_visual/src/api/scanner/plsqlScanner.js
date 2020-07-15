import axios from "../axios";
import { baseURL } from './config'

export function scanPlsql() {
  return axios({
    baseURL: baseURL,
    url: '/sql-analyses',
    method: "POST",
    timeout: 180000, // 请求超时时间
  });
}
