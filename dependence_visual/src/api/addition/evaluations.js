import axios from "../axios";
import { baseURL } from "./config";

export function queryEvaluationList() {
  return axios({
    baseURL: baseURL,
    url: "/evaluations",
    method: "GET",
  });
}

export function queryEvaluation(id) {
  return axios({
    baseURL: baseURL,
    url: "/evaluations/" + id,
  });
}

export function queryEvaluationDetails(id) {
  return axios({
    baseURL: baseURL,
    url: "/evaluation-details/" + id,
  });
}
