import axios from "../axios";
import { baseURL } from './config'

export function queryMethodDependence(
  className,
  methodName,
  dependenceType,
  parameter
) {
  return axios({
    baseURL: baseURL,
    url: "/method/" + className + "/" + methodName + "/" + dependenceType,
    method: "GET",
    params: parameter
  });
}

export function queryClassDependence(className, dependenceType, parameter) {
  return axios({
    baseURL: baseURL,
    url: "/class/" + className + "/" + dependenceType,
    method: "GET",
    params: parameter
  });
}

export function queryProcedureDependence(packageName, procedureName,dependenceType, parameter) {
  return axios({
    baseURL: baseURL,
    url: "/plsql/" + packageName + "/" + procedureName + "/" + dependenceType,
    method: "GET",
    params: parameter
  });
}
