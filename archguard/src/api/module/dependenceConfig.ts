import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";

export function queryConfig() {
  const systemId = storage.getSystemId();

  return axios<any>({
    url: `/api/systems/${systemId}/configures`,
    method: "GET"
  });
}

export function updateConfig(type: string, parameter: any) {
  const systemId = storage.getSystemId();

  return axios<any>({
    url: `/api/systems/${systemId}/configures/types/${type}`,
    method: 'POST',
    data: parameter
  })
}
