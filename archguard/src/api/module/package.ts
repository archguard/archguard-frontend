import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";

interface PackageDependenciesModel {
  module: string;
  [key: string]: any;
}

export function queryPackageDependencies(language: string) {
  return axios<PackageDependenciesModel[]>({
    baseURL: `/api/systems/${(storage.getSystemId())}`,
    url: `/package/dependencies?language=${escape(language)}`,
    method: "GET"
  });
}
