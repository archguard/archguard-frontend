import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";


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
  value: number;
  lines: number;
}

export function queryHotFiles() {
  return axios<gitFile[]>({
    url: `/api/systems/${(storage.getSystemId())}/git/hot-files`,
    method: "GET",
  });
}

export function getGitPathChanges() {
  return axios<GitPathChange[]>({
    url: `/api/systems/${(storage.getSystemId())}/git/path-change-count`,
    method: "GET",
  });
}
export function queryUnstableFiles() {
  return axios<GitPathChange[]>({
    url: `/api/systems/${(storage.getSystemId())}/git/unstable-file`,
    method: "GET",
  });
}
