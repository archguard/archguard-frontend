import axios from "../axios";
import { baseURL } from "./config";

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
    baseURL,
    url: "/git/hot-files/",
    method: "GET",
  });
}

export function allGitChange() {
  return axios<GitChange[]>({
    baseURL,
    url: "/git/changes/",
    method: "GET",
  });
}
