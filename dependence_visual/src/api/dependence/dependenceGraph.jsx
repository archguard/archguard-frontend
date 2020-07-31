import axios from "../axios";
import { baseURL } from "./config";

export function queryMethodDependence(className, methodName, dependenceType, parameter) {
  parameter.clazz = className;
  return axios({
    baseURL: "/api/module",
    url: "/methods/" + methodName + "/" + dependenceType,
    method: "GET",
    params: parameter,
  });
}

export function queryClassDependence(className, dependenceType, parameter) {
  return axios({
    baseURL: "/api/module",
    url: `/classes/${className}/${dependenceType}`,
    method: "GET",
    params: parameter,
  });
}
