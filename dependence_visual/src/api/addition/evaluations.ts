import { SystemEvaluationHistoryType } from "../../models/system-evaluation";
import axios from "../axios";
import { baseURL } from "./config";
export function queryEvaluationList() {
  return axios<SystemEvaluationHistoryType[]>({
    baseURL: baseURL,
    url: "/evaluations",
    method: "GET",
  });
}

export function queryEvaluation<T>(id: string) {
  return axios<SystemEvaluationHistoryType[]>({
    baseURL: baseURL,
    url: `/evaluations/${id}`,
    method: "GET",
  });
}

export function queryEvaluationDetails<T>(id: string) {
  return axios<T>({
    baseURL: baseURL,
    url: `/evaluation-details/${id}`,
    method: "GET",
  });
}
