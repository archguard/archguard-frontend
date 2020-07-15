import axios from "../axios";
import {baseURL} from './config'

export function queryHotSpot(parameter) {
  return axios({
    baseURL: baseURL,
    url: "/hotspot",
    method: "GET",
    params: parameter
  });
}

export function queryScatterCommits(parameter) {
  return axios({
    baseURL: baseURL,
    url: "/scatter-commits",
    method: "GET",
    params: parameter
  })
}