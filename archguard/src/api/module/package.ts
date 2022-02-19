import { baseURL } from './config';
import axios from "../axios";

interface PackageDependenciesModel {
  module: string;
  [key: string]: any;
}

export function queryPackageDependencies() {
  return axios<PackageDependenciesModel[]>({
    baseURL,
    url: '/package/dependencies',
    method: "GET"
  });
}
