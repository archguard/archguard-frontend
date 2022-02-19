import axios from "../axios";

export function queryPluginTypes() {
  return axios<string[]>({
    url: '/api/plugin/type',
    method: "GET"
  });
}
