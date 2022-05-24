import axios from "../axios";

interface Repository {
  name: string;
  language: string;
  scmUrl: string
}

export function createRepos(repos: Repository[]) {
  return axios<any>({
    url: `/api/ascode/`,
    method: "PUT",
    data: repos
  });
}
