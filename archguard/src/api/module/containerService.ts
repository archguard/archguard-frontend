import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";
import qs from 'qs';

export function queryContainerServices() {
  return axios<any>({
    url: `/api/container-service/${(storage.getSystemId())}/`,
    method: "GET"
  });
}

export function queryContainerByIds(ids: string[]) {
  return axios<any>({
    params: {
      system: ids
    },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    url: `/api/container-service/systems/`,
    method: "GET"
  });
}

export function queryFlareData() {
  return axios<any>({
    url: `/api/container-service/flare/`,
    method: "GET"
  });
}
