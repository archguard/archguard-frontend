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

export interface GitChange {
  path: string;
  modifiedCount: number;
}

export function queryHotFiles() {
  return axios<gitFile[]>({
    baseURL: `/api/systems/${systemId}`,
    url: "/git/hot-files/",
    method: "GET",
  });
}

export function allGitChange() {
  return axios<GitChange[]>({
    baseURL: `/api/systems/${systemId}`,
    url: "/git/changes/",
    method: "GET",
  });
}
