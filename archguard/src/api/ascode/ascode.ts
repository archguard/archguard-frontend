import axios from "../axios";
import { ScanModel } from "@/types/ascode";

interface Repository {
  name: string;
  language: string;
  scmUrl: string
}

export function createRepos(repos: Repository[]) {
  return axios<any>({
    url: `/api/ascode/repos`,
    method: "PUT",
    data: repos
  });
}

export function createScan(data: ScanModel) {
  return axios<any>({
    url: `/api/ascode/scan`,
    method: "PUT",
    data,
  });
}
