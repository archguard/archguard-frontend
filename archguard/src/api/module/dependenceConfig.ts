import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";

export function queryConfig() {
  return axios<any>({
    url: `/api/systems/${(storage.getSystemId())}/configures`,
    method: "GET"
  });
}

export function updateConfig(type: string, parameter: any) {
  return axios<any>({
    url: `/api/systems/${(storage.getSystemId())}/configures/types/${type}`,
    method: 'POST',
    data: parameter
  })
}
