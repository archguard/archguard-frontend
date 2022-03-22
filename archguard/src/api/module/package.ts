import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";

interface PackageDependenciesModel {
  module: string;
  [key: string]: any;
}

const systemId = storage.getSystemId();
export function queryPackageDependencies(language: string) {
  return axios<PackageDependenciesModel[]>({
    baseURL: `/api/systems/${systemId}`,
    url: `/package/dependencies?language=${language}`,
    method: "GET"
  });
}
