import axios from "../axios";

export function scanDependence(systemId: number) {
  return axios({
    url: `/api/scanner/systems/${systemId}/dependency-analyses`,
    method: "POST",
    timeout: 180000, // 请求超时时间
  });
}

export function cancelScanDependence(systemId: number) {
  return axios({
    url: `/api/scanner/systems/${systemId}/dependency-analyses/cancel`,
    method: "POST",
    timeout: 180000, // 请求超时时间
  });
}
