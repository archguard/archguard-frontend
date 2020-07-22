import { ScannerConfigType } from "../../models/scanner";
import axios from "../axios";
import { baseURL } from "./config";

export function queryScannerConfig() {
  return axios.get<{}, ScannerConfigType[]>("/config", {
    baseURL: baseURL,
  });
}

export function updateScannerConfig(configs: ScannerConfigType[]) {
  return axios({
    baseURL: baseURL,
    url: "/config",
    method: "POST",
    data: configs,
  });
}
