import axios from "../axios";
import { baseURL } from "./config";

export function queryMethodDependence(className, methodName, dependenceType, parameter) {
  parameter.clazz = className;
  return axios({
    baseURL: "/api/module",
    url: "/methods/" + methodName + "/invokes",
    method: "GET",
    params: parameter,
  });
}

export function queryClassDependence(className, dependenceType, parameter) {
  return axios({
    baseURL: "/api/module",
    url: `/classes/${className}/dependencies`,
    method: "GET",
    params: parameter,
  });
}

export function queryProcedureDependence(packageName, procedureName, dependenceType, parameter) {
  return axios({
    baseURL: baseURL,
    url: "/plsql/" + packageName + "/" + procedureName + "/" + dependenceType,
    method: "GET",
    params: parameter,
  });
}
