import axios from "../axios";
const systemInfoApi = "/api/system-info";

export interface SystemInfo {
  id: number;
  systemName: string;
  repo: string[];
  repoType: "GIT" | "SVN";
  username: string;
  password: string;
  language: string;
  codePath: string;
  sql: string;
  scanned: "NONE" | "SCANNING" | "SCANNED" | "FAILED";
  updatedTime: number;
  badSmellThresholdSuiteId: number;
  branch: string;
}

export function querySystemInfo() {
  return axios<SystemInfo[]>({
    url: systemInfoApi,
    method: "GET",
  });
}

export function updateSystemInfo(parameter: any) {
  return axios<void>({
    url: systemInfoApi,
    method: "PUT",
    data: parameter,
  });
}

export function createSystemInfo(parameter: any) {
  return axios<void>({
    url: systemInfoApi,
    method: "POST",
    data: parameter,
  });
}

export function deleteSystem(systemId: number) {
  return axios<void>({
    url: `${systemInfoApi}/${systemId}`,
    method: "DELETE",
  });
}
