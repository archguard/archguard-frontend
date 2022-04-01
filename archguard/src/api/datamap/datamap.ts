import axios from "../axios";
import qs from 'qs';

export function queryDatamap(systemId: number) {
  return axios<any>({
    url: `/api/datamap/${systemId}/`,
    method: "GET"
  });
}
