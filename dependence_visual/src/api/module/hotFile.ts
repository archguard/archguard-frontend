import axios from "../axios";
import { baseURL } from "./config";

export interface hotFile {
  jclassId: string;
  systemId: number;
  moduleName: string;
  packageName: string;
  typeName: string;
  modifiedCount: number;
}

export function queryHotFiles() {
  return axios<hotFile[]>({
    baseURL,
    url: "/git-hot-files/",
    method: "GET",
  });
}
