import axios from "../axios";
import { baseURL } from "./config";

export function createEvaluation(type: string) {
  return axios<{ isRunning: boolean }>({
    baseURL: baseURL,
    url: `/evaluations`,
    method: "POST",
    data: { type },
  });
}

export function checkEvaluationState(type: string) {
  return axios<{ isRunning: boolean }>({
    baseURL: baseURL,
    url: `/evaluations/status`,
    method: "GET",
    params: { type },
  });
}
