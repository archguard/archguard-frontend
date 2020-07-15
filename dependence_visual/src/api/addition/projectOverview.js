import axios from "../axios";
import { baseURL } from './config'

export function queryProjectOverView() {
  return axios({
    baseURL: baseURL,
    url: '/reports/overview',
    method: "GET"
  });
}
