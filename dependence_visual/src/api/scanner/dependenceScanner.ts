import axios from "../axios";

export function scanDependence(projectId: number) {
  return axios({
    url: `/api/scanner/systems/${projectId}/dependency-analyses`,
    method: "POST",
    timeout: 180000, // 请求超时时间
  });
}
