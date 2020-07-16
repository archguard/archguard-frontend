import axios from "../axios";
import _ from "lodash";
import { baseURL } from "./config";
import { ModuleType } from "../../pages/analysis/dependence/ModuleDependence/config";

const subUrl = "/logic-modules";

export function queryModule() {
  return axios({
    baseURL: baseURL,
    url: subUrl,
    method: "GET",
  }).then((res) => _.orderBy(res, ["status", "name"], ["desc", "asc"]));
}

export function deleteModule(parameter: {id: string}) {
  return axios({
    baseURL: baseURL,
    url: subUrl + "/" + parameter.id,
    method: "DELETE",
  });
}

export function updateModule(parameter: {id: string}) {
  return axios({
    baseURL: baseURL,
    url: subUrl + "/" + parameter.id,
    method: "PUT",
    data: parameter,
  });
}

export function createModule(parameter: {}) {
  return axios({
    baseURL: baseURL,
    url: subUrl,
    method: "POST",
    data: parameter,
  });
}

export function queryModuleOptions() {
  return axios({
    baseURL: baseURL,
    url: "/base-modules",
    method: "GET",
  });
}

export function autoDefineModule() {
  return axios({
    baseURL: baseURL,
    url: subUrl + "/auto-define",
    method: "POST",
  });
}

export function autoDefineModuleWithInterface() {
  return axios({
    baseURL: baseURL,
    url: subUrl + "/auto-define-with-interface",
    method: "POST",
  });
}

export function queryModuleDependencies(parameter: {}) {
  return axios({
    baseURL: baseURL,
    url: subUrl + "/dependencies",
    method: "GET",
    params: parameter,
  });
}

export function queryModuleCoupling() {
  return axios({
    baseURL: baseURL,
    url: "/logic-modules/coupling-detail",
    method: "GET",
  });
}

export function hideAllModules() {
  return axios({
    baseURL: baseURL,
    url: "/logic-modules/hide-all",
    method: "POST",
  });
}

export function showAllModules() {
  return axios({
    baseURL: baseURL,
    url: "/logic-modules/show-all",
    method: "POST",
  });
}

export function reverseAllModules() {
  return axios({
    baseURL: baseURL,
    url: "/logic-modules/reverse-all",
    method: "POST",
  });
}

export function queryAllModuleDependence() {
  return axios({
    baseURL: baseURL,
    url: "/logic-modules/graph",
    method: "GET",
  });
}

export function queryAllModuleDubboDependence() {
  return axios({
    baseURL: baseURL,
    url: "/logic-modules/graph-dubbo",
    method: "GET",
  });
}
const queryMap:{[key in ModuleType]: Function} = {
  [ModuleType.NORMAL]: queryAllModuleDependence,
  [ModuleType.DUBBO]: queryAllModuleDubboDependence,
  [ModuleType.SPRINGCLOUD]: queryAllModuleDubboDependence,
};
export function queryAllModuleDependenceByType(moduleType: ModuleType) {
  const queryMethod = queryMap[moduleType];
  return queryMethod();
}
