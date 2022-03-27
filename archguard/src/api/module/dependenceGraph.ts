import axios from "../axios";
import { JMethod } from '@/models/java';
import { storage } from "@/store/storage/sessionStorage";

export function queryMethodDependence(className: string, dependenceType: string, parameter: any) {
  parameter.clazz = className;
  return axios<JMethod[]>({
    url: `/api/systems/${(storage.getSystemId())}/methods/${dependenceType}`,
    method: "GET",
    params: parameter,
  });
}

export function queryClassDependence(className: string, dependenceType: string, parameter: any) {
  return axios<any>({
    url: `/api/systems/${(storage.getSystemId())}/classes/${className}/${dependenceType}`,
    method: "GET",
    params: parameter,
  });
}
