import { ScannerConfigType } from "../../models/scanner";
import axios from "../axios";
import storage from '@/store/storage/sessionStorage'

export function queryScannerConfig() {
  const projectId = storage.getProjectId()

  return axios<ScannerConfigType>({
    url: `/scanner/projects/${projectId}/config`,
    method: "GET",
  });
}

export function updateScannerConfig(configs: ScannerConfigType[]) {
  const projectId = storage.getProjectId()

  return axios({
    url: `/scanner/projects/${projectId}/config`,
    method: "POST",
    data: configs,
  });
}
