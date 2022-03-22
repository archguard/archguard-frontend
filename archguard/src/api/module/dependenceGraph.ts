import axios from "../axios";
import { JMethod } from '@/models/java';
import { storage } from "@/store/storage/sessionStorage";

const systemId = storage.getSystemId();
export function queryMethodDependence(className: string, dependenceType: string, parameter: any) {
  parameter.clazz = className;
  return axios<JMethod[]>({
    baseURL: `/api/systems/${systemId}`,
    url: `/methods/${dependenceType}`,
    method: "GET",
    params: parameter,
  });
}

export function queryClassDependence(className: string, dependenceType: string, parameter: any) {
  return axios<any>({
    baseURL: `/api/systems/${systemId}`,
    url: `/classes/${className}/${dependenceType}`,
    method: "GET",
    params: parameter,
  });
}
