import { baseURL } from "./config";
import axios from "../axios";

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
    url: "/hot-file/",
    method: "GET",
  });
}
