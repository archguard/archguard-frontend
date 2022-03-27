import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";

interface PackageDependenciesModel {
  module: string;
  [key: string]: any;
}

export function queryPackageDependencies(language: string) {
  const systemId = storage.getSystemId();

  return axios<PackageDependenciesModel[]>({
    baseURL: `/api/systems/${systemId}`,
    url: `/package/dependencies?language=${escape(language)}`,
    method: "GET"
  });
}
