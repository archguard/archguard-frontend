import axios from "../axios";

export function queryPluginTypes() {
  return axios<string[]>({
    url: '/api/module/plugin/type',
    method: "GET"
  });
}
