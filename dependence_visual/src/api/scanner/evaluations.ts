import axios from "../axios";
import { baseURL } from "./config";

export function createEvaluation(type: string) {
  return axios.post<{}, { isRunning: boolean }>("/evaluations", { type }, { baseURL: baseURL });
}

export function checkEvaluationState(type: string) {
  return axios.get<{}, { isRunning: boolean }>("/evaluations/status", {
    baseURL: baseURL,
    params: { type },
  });
}
