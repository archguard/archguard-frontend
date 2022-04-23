import axios from "../axios";

interface PackageDependenciesModel {
  module: string;
  [key: string]: any;
}

export function queryPackageDependencies(language: string, systemId: number) {
  return axios<PackageDependenciesModel[]>({
    baseURL: `/api/systems/${systemId}`,
    url: `/package/dependencies?language=${escape(language)}`,
    method: "GET"
  });
}
