import axios from '../axios'
import storage from '@/store/storage/sessionStorage'

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
  const projectId = storage.getProjectId()

  return axios<CodeTree>({
    url: `/module/projects/${projectId}/code-tree/`,
    method: "GET"
  });
}

export function queryDFMSMetricBy(
  by: "module" | "package" | "class",
  params: MetricParams,
) {
  const projectId = storage.getProjectId()

  return axios<DFMSMetric>({
    url: `/module/projects/${projectId}/metric/dfms/${by}`,
    method: 'GET',
    params,
  })
}
