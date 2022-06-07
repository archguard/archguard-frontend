import axios from "../axios";

export function queryDatamap(systemId: number) {
  return axios<any>({
    url: `/api/datamap/${systemId}`,
    method: "GET"
  });
}
