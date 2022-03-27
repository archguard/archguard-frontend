import axios from '../axios'
import { storage } from "@/store/storage/sessionStorage";

interface MetricParams {
  moduleName?: string;
  packageName?: string;
  className?: string;
}

export interface DFMSMetric {
  absRatio: number,
  innerInstabilityAvg: number,
  outerInstabilityAvg: number,
  [key: string]: any
}

export function queryCodeTree() {
  const systemId = storage.getSystemId();

  return axios<CodeTree>({
    url: `/api/systems/${systemId}/code-tree/`,
    method: "GET"
  });
}

export function queryDFMSMetricBy(
  by: "module" | "package" | "class",
  params: MetricParams,
) {
  const systemId = storage.getSystemId();

  return axios<DFMSMetric>({
    url: `/api/systems/${systemId}/metric/dfms/${by}`,
    method: 'GET',
    params,
  })
}
