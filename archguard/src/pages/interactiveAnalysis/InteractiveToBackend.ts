import { createRepos } from "@/api/ascode/ascode";

export interface Repo {
  name: string;
  language: string;
  scmUrl: string;
}

export const RepoAction = {
  create(repos: Repo[]): Promise<any> {
    return createRepos(repos)
  },
};
