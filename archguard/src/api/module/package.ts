import { baseURL } from './config';
import axios from "../axios";

interface PackageDependenciesModel {
  module: string;
  [key: string]: any;
}

export function queryPackageDependencies(language: string) {
  return axios<PackageDependenciesModel[]>({
    baseURL,
    url: `/package/dependencies?language=${language}`,
    method: "GET"
  });
}
