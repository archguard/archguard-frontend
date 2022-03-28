import _ from "lodash";
import axios from "../axios";
import { methodDependency } from "@/pages/dependence/ModuleDependence/components/ModuleDependenceTable/columns";
import { ReportMapper } from "@/pages/metrics/ModuleCouplingTree/Report";
import { storage } from "@/store/storage/sessionStorage";

export interface Module {
  id?: string;
  name: string;
  members: string[];
  status?: string;
}

export function queryModule() {
  const systemId = storage.getSystemId();

  return axios<Module[]>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-modules",
    method: "GET",
  }).then((res) => _.orderBy(res, ["status", "name"], ["desc", "asc"]));
}

export function deleteModule(parameter: { id: string }) {
  const systemId = storage.getSystemId();

  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: `/logic-modules/${parameter.id}`,
    method: "DELETE",
  });
}

export function updateModule(parameter: Module) {
  const systemId = storage.getSystemId();

  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: `/logic-modules/${parameter.id}`,
    method: "PUT",
    data: parameter,
  });
}

export function createModule(parameter: {}) {
  const systemId = storage.getSystemId();

  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-modules",
    method: "POST",
    data: parameter,
  });
}

export function queryModuleOptions() {
  const systemId = storage.getSystemId();

  return axios<string[]>({
    baseURL: `/api/systems/${systemId}`,
    url: "/base-modules",
    method: "GET",
  });
}

export function autoDefineModule() {
  const systemId = storage.getSystemId();

  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-modules/auto-define",
    method: "POST",
  });
}

export function queryModuleDependencies(parameter: {}, systemId: number) {
  return axios<methodDependency[]>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-modules/dependencies",
    method: "GET",
    params: parameter,
  });
}

export function queryModuleCoupling() {
  const systemId = storage.getSystemId();

  return axios<ReportMapper[]>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-modules/metrics",
    method: "GET",
  });
}

export function hideAllModules() {
  const systemId = storage.getSystemId();

  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-modules/hide-all",
    method: "POST",
  });
}

export function showAllModules() {
  const systemId = storage.getSystemId();

  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-modules/show-all",
    method: "POST",
  });
}

export function reverseAllModules() {
  const systemId = storage.getSystemId();

  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-modules/reverse-all",
    method: "POST",
  });
}

export function queryAllModuleDependence(systemId: number) {
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
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-modules/dependencies/graph",
    method: "GET",
  });
}
