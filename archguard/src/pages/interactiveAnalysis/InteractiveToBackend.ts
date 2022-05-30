import { createRepos, createScan, saveCode } from "@/api/ascode/ascode";
import { ScanModel } from "@/types/ascode";

export interface Repo {
  name: string;
  language: string;
  scmUrl: string;
}

export const BackendAction = {
  createRepos(repos: Repo[]): Promise<any> {
    return createRepos(repos);
  },
  createScan(data: ScanModel): Promise<any> {
    return createScan(data);
  },
  saveCode(code: String): Promise<any> {
    return saveCode(1, code);
  },
};
