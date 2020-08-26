import axios from "../axios";

export function queryPluginTypes() {
  return axios<string[]>({
    url: '/module/plugin/type',
    method: "GET"
  });
}
