import { baseURL } from './config';
import axios from "../axios";

export function createEvaluation(type: string) {
  return axios<{ isRunning: boolean }>({
    baseURL,
    url: '/evaluations',
    method: "POST",
    data: { type },
  });
}

export function checkEvaluationState(type: string) {
  return axios<{ isRunning: boolean }>({
    baseURL,
    url: `/evaluations/status`,
    method: "GET",
    params: { type },
  });
}
