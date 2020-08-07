import { ReportMapper } from "@/pages/analysis/dependence/ModuleDependence/components/ModuleCouplingTree/report";
import { methodDependency } from "@/pages/analysis/dependence/ModuleDependence/components/ModuleDependenceTable/columns";
import _ from "lodash";
import axios from "../axios";
import { baseURL } from "./config";

const subUrl = "/logic-modules";

export interface Module {
  id?: string;
  name: string;
  members: string[];
  status?: string;
}

export function queryModule() {
  return axios<Module[]>({
    baseURL: baseURL,
    url: subUrl,
    method: "GET",
  }).then((res) => _.orderBy(res, ["status", "name"], ["desc", "asc"]));
}

export function deleteModule(parameter: { id: string }) {
  return axios({
    baseURL: baseURL,
    url: subUrl + "/" + parameter.id,
    method: "DELETE",
  });
}

export function updateModule(parameter: Module) {
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
  return axios<string[]>({
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

export function queryModuleDependencies(parameter: {}) {
  return axios<methodDependency[]>({
    baseURL: baseURL,
    url: subUrl + "/dependencies",
    method: "GET",
    params: parameter,
  });
}

export function queryModuleCoupling() {
  return axios<ReportMapper[]>({
    baseURL: baseURL,
    url: "/logic-modules/metrics",
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
  return axios<{
    nodes: {
      fullName: string;
      id: string;
      lgMembers: string[];
      logicModule: boolean;
      members: { name: string; fullName: string; type: string }[];
      mixture: boolean;
      name: string;
      nodeId: string;
      service: boolean;
      status: string;
      type: string;
    }[];
    edges: { a: string; b: string; num: number }[];
  }>({
    baseURL: baseURL,
    url: "/logic-modules/dependencies/graph",
    method: "GET",
  });
}
