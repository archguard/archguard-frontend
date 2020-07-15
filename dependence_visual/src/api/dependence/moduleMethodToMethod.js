import axios from "../axios";
import { baseURL } from './config'

export function queryModuleMethodToMethod(moduleAName, moduleBName) {
  return axios({
    baseURL: baseURL,
    url: "/method_method/" + moduleAName + "/" + moduleBName,
    method: "GET"
  });
}


export function deleteModuleCache() {
  return axios({
    baseURL: baseURL,
    url: "/java/cache",
    method: "DELETE"
  });
}
