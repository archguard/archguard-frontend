import axios from "../axios";
const projectInfoApi = "/addition/project-info";

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
    url: projectInfoApi,
    method: "GET"
  });
}

export function updateProjectInfo(parameter: any) {
  return axios<any>({
    url: projectInfoApi,
    method: "PUT",
    data: parameter
  });
}

export function createProjectInfo(parameter: any) {
  return axios<any>({
    url: projectInfoApi,
    method: "POST",
    data: parameter
  });
}
