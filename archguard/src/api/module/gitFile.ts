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
    url: `/api/systems/${systemId}/change/hot-files`,
    method: "GET",
  });
}

export function getGitPathChanges(systemId: String) {
  return axios<GitPathChange[]>({
    url: `/api/systems/${systemId}/change/path-change-count`,
    method: "GET",
  });
}

export function queryUnstableFiles(systemId: String) {
  return axios<GitPathChange[]>({
    url: `/api/systems/${systemId}/change/unstable-file`,
    method: "GET",
  });
}

export function queryCommitByRanges(systemId: String, startTime: String, endTime: String) {
  console.log(systemId, systemId, endTime)
  return axios<string[]>({
    url: `/api/systems/${systemId}/change/commit-ids`,
    params: {
      startTime,
      endTime,
    },
    method: "GET",
  });
}
