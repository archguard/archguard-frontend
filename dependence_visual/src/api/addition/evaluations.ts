import { SystemEvaluationHistoryType } from "../../models/system-evaluation";
import axios from "../axios";

export function queryEvaluationList() {
  return axios<SystemEvaluationHistoryType[]>({
    url: `/addition/evaluations`,
    method: "GET",
  });
}

export function queryEvaluation<T>(id: string) {
  return axios<SystemEvaluationHistoryType[]>({
    url: `/addition/evaluations/${id}`,
    method: "GET",
  });
}

export function queryEvaluationDetails<T>(id: string) {
  return axios<T>({
    url: `/addition/evaluation-details/${id}`,
    method: "GET",
  });
}
