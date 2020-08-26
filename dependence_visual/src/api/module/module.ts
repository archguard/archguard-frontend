import _ from "lodash";
import axios from "../axios";
import storage from '@/store/storage/sessionStorage'
import { ReportMapper } from "@/pages/analysis/dependence/ModuleDependence/components/ModuleCouplingTree/report";
import { methodDependency } from "@/pages/analysis/dependence/ModuleDependence/components/ModuleDependenceTable/columns";

export interface Module {
  id?: string;
  name: string;
  members: string[];
  status?: string;
}

export function queryModule() {
  const projectId = storage.getProjectId()

  return axios<Module[]>({
    url: `/module/projects/${projectId}/logic-modules`,
    method: "GET",
  }).then((res) => _.orderBy(res, ["status", "name"], ["desc", "asc"]));
}

export function deleteModule(parameter: { id: string }) {
  const projectId = storage.getProjectId()

  return axios<any>({
    url: `/module/projects/${projectId}/logic-modules/${parameter.id}`,
    method: "DELETE",
  });
}

export function updateModule(parameter: Module) {
  const projectId = storage.getProjectId()

  return axios<any>({
    url: `/module/projects/${projectId}/logic-modules/${parameter.id}`,
    method: "PUT",
    data: parameter,
  });
}

export function createModule(parameter: {}) {
  const projectId = storage.getProjectId()

  return axios<any>({
    url: `/module/projects/${projectId}/logic-modules`,
    method: "POST",
    data: parameter,
  });
}

export function queryModuleOptions() {
  const projectId = storage.getProjectId()

  return axios<string[]>({
    url: `/module/projects/${projectId}/base-modules`,
    method: "GET",
  });
}

export function autoDefineModule() {
  const projectId = storage.getProjectId()

  return axios<any>({
    url: `/module/projects/${projectId}/logic-modules/auto-define`,
    method: "POST",
  });
}

export function queryModuleDependencies(parameter: {}) {
  const projectId = storage.getProjectId()

  return axios<methodDependency[]>({
    url: `/module/projects/${projectId}/logic-modules/dependencies`,
    method: "GET",
    params: parameter,
  });
}

export function queryModuleCoupling() {
  const projectId = storage.getProjectId()

  return axios<ReportMapper[]>({
    url: `/module/projects/${projectId}/logic-modules/metrics`,
    method: "GET",
  });
}

export function hideAllModules() {
  const projectId = storage.getProjectId()

  return axios<any>({
    url: `/module/projects/${projectId}/logic-modules/hide-all`,
    method: "POST",
  });
}

export function showAllModules() {
  const projectId = storage.getProjectId()

  return axios<any>({
    url: `/module/projects/${projectId}/logic-modules/show-all`,
    method: "POST",
  });
}

export function reverseAllModules() {
  const projectId = storage.getProjectId()

  return axios<any>({
    url: `/module/projects/${projectId}/logic-modules/reverse-all`,
    method: "POST",
  });
}

export function queryAllModuleDependence() {
  const projectId = storage.getProjectId()

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
    url: `/module/projects/${projectId}/logic-modules/dependencies/graph`,
    method: "GET",
  });
}
