import axios from "../axios";
import { JMethod } from '@/models/java';
import storage from '@/store/storage/sessionStorage'

export function queryMethodDependence(className: string, methodName: string, dependenceType: string, parameter: any) {
  parameter.clazz = className;
  const projectId = storage.getProjectId()

  return axios<JMethod[]>({
    url: `/module/projects/${projectId}/methods/${methodName}/${dependenceType}`,
    method: "GET",
    params: parameter,
  });
}

export function queryClassDependence(className: string, dependenceType: string, parameter: any) {
  const projectId = storage.getProjectId()

  return axios<any>({
    url: `/module/projects/${projectId}/classes/${className}/${dependenceType}`,
    method: "GET",
    params: parameter,
  });
}
