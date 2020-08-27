import { baseURL } from './config';
import axios from '../axios'

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
  return axios<CodeTree>({
    baseURL,
    url: '/code-tree/',
    method: "GET"
  });
}

export function queryDFMSMetricBy(
  by: "module" | "package" | "class",
  params: MetricParams,
) {
  return axios<DFMSMetric>({
    baseURL,
    url: `/metric/dfms/${by}`,
    method: 'GET',
    params,
  })
}
