import axios from "../axios";
import { baseURL } from "./config";

export function createEvaluation(parameter) {
  return axios({
    baseURL: baseURL,
    url: "/evaluations",
    method: "POST",
    data: parameter,
  });
}


export function checkEvaluationState(parameter) {
  return axios({
    baseURL: baseURL,
    url: "/evaluations/status",
    method: "GET",
    params: parameter,
  });
}