import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";

const systemId = storage.getSystemId();
export function queryAllModuleCoupling() {
  return axios<ModuleCoupling[]>({
    baseURL: `/api/systems/${systemId}`,
    url: `/metric/coupling/all-module`,
    method: "GET",
  });
}

export function queryClassCoupling(moduleName: string, packageName: string) {
  return axios<ClassCoupling[]>({
    baseURL: `/api/systems/${systemId}`,
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
    baseURL: `/api/systems/${systemId}`,
    url: `/metric/coupling/package-list`,
    method: "POST",
    data: packageNames,
  });
}
