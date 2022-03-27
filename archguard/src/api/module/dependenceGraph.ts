import axios from "../axios";
import { JMethod } from '@/models/java';
import { storage } from "@/store/storage/sessionStorage";

export function queryMethodDependence(className: string, dependenceType: string, parameter: any) {
  const systemId = storage.getSystemId();

  parameter.clazz = className;
  return axios<JMethod[]>({
    url: `/api/systems/${systemId}/methods/${dependenceType}`,
    method: "GET",
    params: parameter,
  });
}

export function queryClassDependence(className: string, dependenceType: string, parameter: any) {
  const systemId = storage.getSystemId();

  return axios<any>({
    url: `/api/systems/${systemId}/classes/${className}/${dependenceType}`,
    method: "GET",
    params: parameter,
  });
}
