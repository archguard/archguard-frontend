import { baseURL } from './config';
import axios from "../axios";
import { JMethod } from '@/models/java';

export function queryMethodDependence(className: string, dependenceType: string, parameter: any) {
  parameter.clazz = className;
  return axios<JMethod[]>({
    baseURL,
    url: `/methods/${dependenceType}`,
    method: "GET",
    params: parameter,
  });
}

export function queryClassDependence(className: string, dependenceType: string, parameter: any) {
  return axios<any>({
    baseURL,
    url: `/classes/${className}/${dependenceType}`,
    method: "GET",
    params: parameter,
  });
}
