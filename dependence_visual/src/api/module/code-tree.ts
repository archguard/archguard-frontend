import axios from '../axios'
import { baseURL } from './config';

interface MetricParams {
  moduleName?: string;
  packageName?: string;
  className?: string;
}

export function queryCodeTree() {
  return axios<CodeTree>({
    baseURL: baseURL,
    url: "/code-tree/",
    method: "GET"
  });
}

export function queryDFMSMetricBy(
  by: "module" | "package" | "class",
  params: MetricParams,
) {
  return axios({
    baseURL: baseURL,
    url: `/metric/dfms/${by}`,
    method: 'GET',
    params,
  })
}
