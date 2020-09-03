import axios from "../axios";
import { baseURL } from "./config";

export interface MethodLines {
  moduleName: string;
  packageName: string;
  typeName: string;
  methodName: string;
  systemId: number;
  lines: number;
}

interface MethodLinesPagedDataResponse {
  count: number,
  currentPageNumber: number,
  data: MethodLines[],
}

export function getOverviewUsingMethods(currentPageNumber: number, numberPerPage: number) {
  return axios<MethodLinesPagedDataResponse>({
    baseURL,
    url: '/codeline/methods/above-threshold',
    method: "GET",
    params: { currentPageNumber, numberPerPage },
  });
}

