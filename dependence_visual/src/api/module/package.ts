import axios from "../axios";
import { baseURL } from './config'

interface PackageDependenciesModel {
  module: string;
  [key: string]: any;
}

export function queryPackageDependencies() {
  return axios<PackageDependenciesModel[]>({
    baseURL: baseURL,
    url: "/package/dependencies",
    method: "GET"
  });
}
