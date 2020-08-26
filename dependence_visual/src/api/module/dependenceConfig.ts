import axios from "../axios";
import storage from '@/store/storage/sessionStorage'

export function queryConfig() {
  const projectId = storage.getProjectId()

  return axios<any>({
    url: `/module/projects/${projectId}/configures`,
    method: "GET"
  });
}

export function updateConfig(type: string, parameter: any) {
  const projectId = storage.getProjectId()

  return axios<any>({
    url: `/module/projects/${projectId}/configures/types/${type}`,
    method: 'POST',
    data: parameter
  })
}
