import axios from "../axios";
import { baseURL } from "./config";
export function queryEvaluationList() {
  return axios.get(`${baseURL}/evaluations`);
}

export function queryEvaluation<T>(id: string) {
  return axios.get<T>(`${baseURL}/evaluations/${id}`);
}

export function queryEvaluationDetails<T>(id: string) {
  return axios.get<T>(`${baseURL}/evaluation-details/${id}`);
}
