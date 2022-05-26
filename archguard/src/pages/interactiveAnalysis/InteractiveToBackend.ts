import { createRepos, createScan } from "@/api/ascode/ascode";

export interface Repo {
  name: string;
  language: string;
  scmUrl: string;
}

export const BackendAction = {
  createRepos(repos: Repo[]): Promise<any> {
    return createRepos(repos)
  },
  createScan(data: object): Promise<any> {
    return createScan(data)
  },
};
