import axios from "../axios";
import { baseURL } from './config'

export function scanProject(parameter) {
  return axios({
    baseURL: baseURL,
    url: '/reports',
    method: "POST",
    data: parameter
  });
}
