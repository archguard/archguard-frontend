import axios from "../axios";
import qs from 'qs';

export function queryContainerServices(systemId: number) {
  return axios<any>({
    url: `/api/container-service/${systemId}/`,
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
