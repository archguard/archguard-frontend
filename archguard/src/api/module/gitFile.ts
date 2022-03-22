import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";

const systemId = storage.getSystemId();

export interface gitFile {
  jclassId: string;
  systemId: number;
  moduleName: string;
  packageName: string;
  typeName: string;
  modifiedCount: number;
}

export interface GitPathChange {
  name: string;
  counts: number;
}

export function queryHotFiles() {
  return axios<gitFile[]>({
    url: `/api/systems/${systemId}/git/hot-files/`,
    method: "GET",
  });
}

export function getGitPathChanges() {
  return axios<GitPathChange[]>({
    url: `/api/systems/${systemId}/git//path-change-count/`,
    method: "GET",
  });
}
