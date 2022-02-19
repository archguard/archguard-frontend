import axios from "../axios";
import { baseURL } from "./config";

export function queryAllModuleCoupling() {
  return axios<ModuleCoupling[]>({
    baseURL,
    url: `/metric/coupling/all-module`,
    method: "GET",
  });
}

export function queryClassCoupling(moduleName: string, packageName: string) {
  return axios<ClassCoupling[]>({
    baseURL,
    url: `/metric/coupling/package-class-list`,
    params: {
      packageName,
      moduleName,
    },
    method: "GET",
  });
}

export function queryPackageCoupling(packageNames: string[]) {
  return axios<PackageCoupling[]>({
    baseURL,
    url: `/metric/coupling/package-list`,
    method: "POST",
    data: packageNames,
  });
}
