import axios from "../axios";

export function createEvaluation(type: string) {
  return axios<{ isRunning: boolean }>({
    url: '/api/scanner/evaluations',
    method: "POST",
    data: { type },
  });
}

export function checkEvaluationState(type: string) {
  return axios<{ isRunning: boolean }>({
    url: `/api/scanner/evaluations/status`,
    method: "GET",
    params: { type },
  });
}
