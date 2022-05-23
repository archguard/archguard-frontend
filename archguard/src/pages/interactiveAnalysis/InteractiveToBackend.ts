export interface Repo {
  name: string;
  language: string;
  scmUrl: string;
}

export const RepoAction = {
  create(repos: Repo[]) {

  },
};
