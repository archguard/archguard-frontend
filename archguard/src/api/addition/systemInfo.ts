import axios from "../axios";

export interface SystemInfo {
  id: number;
  systemName: string;
  repo: string[];
  repoType: "GIT" | "SVN" | "LOCAL";
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
    url: "/api/system-info",
    method: "GET",
  });
}

export function updateSystemInfo(parameter: any) {
  return axios<void>({
    url: "/api/system-info",
    method: "PUT",
    data: parameter,
  });
}

export function createSystemInfo(parameter: any) {
  return axios<void>({
    url: "/api/system-info",
    method: "POST",
    data: parameter,
  });
}

export function deleteSystem(systemId: number) {
  return axios<void>({
    url: `/api/system-info/${systemId}`,
    method: "DELETE",
  });
}

interface SystemLog {
  id: string,
  workdir: string,
  log: string
}

export function viewSystemLog(systemId: number) {
  return axios<SystemLog>({
    url: `/api/system-info/${systemId}/log`,
    method: "GET",
  });
}
