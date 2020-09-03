import axios from "../axios";
import { baseURL } from "./config";

export function getOverviewUsingMethods(currentPageNumber: number, numberPerPage: number) {
  return axios<ModuleCoupling[]>({
    baseURL,
    url: '/codeline/methods/above-threshold',
    method: "GET",
    params: { currentPageNumber, numberPerPage },
  });
}

