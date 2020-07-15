import axios from "../axios";
import { baseURL } from "./config";

export function queryConfig() {
  return axios({
    baseURL: baseURL,
    url: "/configures",
    method: "GET"
  });
}

export function deleteConfig(parameter) {
  return axios({
    baseURL: baseURL,
    url: "/configures/" + parameter.id,
    method: "DELETE"
  });
}

export function createConfig(parameter) {
  return axios({
    baseURL: baseURL,
    url: "/configures",
    method: "POST",
    data: parameter
  });
}

export function updateConfig(parameter) {
  return axios({
    baseURL: baseURL,
    url: "/configures/" + parameter.id,
    method: "PUT",
    data: parameter
  });
}

export function refreshConfig() {
  return axios({
    baseURL: baseURL,
    url: "/configure/refresh",
    method: "GET"
  });
}
