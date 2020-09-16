import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";

const systemId = storage.getSystemId();
const baseURL = `/api/scanner/systems/${systemId}`;

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
