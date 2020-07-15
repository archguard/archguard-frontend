import axios from "../axios";
import { baseURL } from './config'

export function queryScannerConfig() {
  return axios({
    baseURL: baseURL,
    url: '/config',
    method: "GET",
  });
}

export function updateScannerConfig(parameter) {
    return axios({
      baseURL: baseURL,
      url: '/config',
      method: "POST",
      data: parameter
    });
  }
