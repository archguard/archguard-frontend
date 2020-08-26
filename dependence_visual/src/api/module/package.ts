import axios from "../axios";
import storage from '@/store/storage/sessionStorage'

interface PackageDependenciesModel {
  module: string;
  [key: string]: any;
}

export function queryPackageDependencies() {
  const projectId = storage.getProjectId()

  return axios<PackageDependenciesModel[]>({
    url: `/module/projects/${projectId}/package/dependencies`,
    method: "GET"
  });
}
