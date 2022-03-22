import { ScannerConfigType } from "@/models/scanner";
import axios from "../axios";

export function queryScannerConfig() {
  return axios<ScannerConfigType>({
    url: '/api/scanner/config',
    method: "GET",
  });
}

export function updateScannerConfig(configs: ScannerConfigType[]) {
  return axios({
    url: '/api/scanner/config',
    method: "POST",
    data: configs,
  });
}
