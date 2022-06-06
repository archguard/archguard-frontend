import axios from "../axios";
import { methodDependency } from "@/pages/dependence/ModuleDependence/components/ModuleDependenceTable/columns";
import { ReportMapper } from "@/pages/system/metrics/ModuleCouplingTree/Report";
import { storage } from "@/store/storage/sessionStorage";
import { Module } from "@/types/module";

export function queryModule(systemId: number) {
  return axios<Module[]>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-modules",
    method: "GET",
  });
}

export function deleteModule(parameter: { id: string }, systemId: number) {
  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: `/logic-module/${parameter.id}`,
    method: "DELETE",
  });
}

export function updateModule(parameter: Module, systemId: number) {
  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: `/logic-module/${parameter.id}`,
    method: "PUT",
    data: parameter,
  });
}

export function createModule(parameter: {}, systemId: number) {
  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-modules",
    method: "POST",
    data: parameter,
  });
}

export function queryModuleOptions(systemId: number) {
  return axios<string[]>({
    baseURL: `/api/systems/${systemId}`,
    url: "/base-modules",
    method: "GET",
  });
}

export function autoDefineModule(systemId: number) {
  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-module/auto-define",
    method: "POST",
  });
}

export function queryModuleDependencies(parameter: {}, systemId: number) {
  return axios<methodDependency[]>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-module/dependencies",
    method: "GET",
    params: parameter,
  });
}

export function queryModuleCoupling() {
  const systemId = storage.getSystemId();

  return axios<ReportMapper[]>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-module/metrics",
    method: "GET",
  });
}

export function hideAllModules(systemId: number) {
  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-module/hide-all",
    method: "POST",
  });
}

export function showAllModules(systemId: number) {
  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-module/show-all",
    method: "POST",
  });
}

export function reverseAllModules(systemId: number) {
  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: "/logic-module/reverse-all",
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
    url: "/logic-module/dependencies/graph",
    method: "GET",
  });
}
