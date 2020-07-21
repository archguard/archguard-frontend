import axios from "../axios";
import { baseURL } from "./config";

export function queryConfig() {
  return axios({
    baseURL: baseURL,
    url: "/configures",
    method: "GET"
  });
}

export function updateConfig(type, parameter) {
  return axios({
    baseURL: baseURL,
    url: `/configures/types/${type}`,
    method: 'POST',
    data: parameter
  })
}
