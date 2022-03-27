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
  const systemId = storage.getSystemId();

  return axios<gitFile[]>({
    url: `/api/systems/${systemId}/git/hot-files`,
    method: "GET",
  });
}

export function getGitPathChanges() {
  const systemId = storage.getSystemId();

  return axios<GitPathChange[]>({
    url: `/api/systems/${systemId}/git/path-change-count`,
    method: "GET",
  });
}
export function queryUnstableFiles() {
  const systemId = storage.getSystemId();

  return axios<GitPathChange[]>({
    url: `/api/systems/${systemId}/git/unstable-file`,
    method: "GET",
  });
}
