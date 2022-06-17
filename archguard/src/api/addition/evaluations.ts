import { SystemEvaluationHistoryType } from "@/types/system-evaluation";
import axios from "../axios";

export function queryEvaluationList() {
  return axios<SystemEvaluationHistoryType[]>({
    url: '/api/evaluations',
    method: "GET",
  });
}

export function queryEvaluationDetails<T>(id: string) {
  return axios<T>({
    url: `/api/evaluation-details/${id}`,
    method: "GET",
  });
}
