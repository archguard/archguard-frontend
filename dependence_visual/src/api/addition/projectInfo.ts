import axios from "../axios";
import { baseURL } from './config';
const projectInfoApi = "/project-info";

export interface ProjectInfo {
  id: number;
  projectName: string;
  repo: string[];
  repoType: "GIT" | "SVN";
  username: string;
  password: string;
  sql: string;
}

export function queryProjectInfo() {
  return axios<ProjectInfo[]>({
    baseURL,
    url: projectInfoApi,
    method: "GET"
  });
}

export function updateProjectInfo(parameter: any) {
  return axios<any>({
    baseURL,
    url: projectInfoApi,
    method: "PUT",
    data: parameter
  });
}

export function createProjectInfo(parameter: any) {
  return axios<any>({
    baseURL,
    url: projectInfoApi,
    method: "POST",
    data: parameter
  });
}
