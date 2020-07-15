import axios from "../axios";
import { baseURL } from './config'

const subUrl = "/project/info";

export function queryProjectInfo() {
  return axios({
    baseURL: baseURL,
    url: subUrl,
    method: "GET"
  });
}

export function updateProjectInfo(parameter) {
  return axios({
    baseURL: baseURL,
    url: subUrl,
    method: "PUT",
    data: parameter
  });
}

export function createProjectInfo(parameter) {
  return axios({
    baseURL: baseURL,
    url: subUrl,
    method: "POST",
    data: parameter
  });
}
