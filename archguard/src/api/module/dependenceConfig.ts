import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";

const systemId = storage.getSystemId();

export function queryConfig() {
  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: '/configures',
    method: "GET"
  });
}

export function updateConfig(type: string, parameter: any) {
  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: `/configures/types/${type}`,
    method: 'POST',
    data: parameter
  })
}
