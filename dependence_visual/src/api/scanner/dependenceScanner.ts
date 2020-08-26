import axios from "../axios";

export function scanDependence() {
  return axios({
    url: `/scanner/dependency-analyses`,
    method: "POST",
    timeout: 180000, // 请求超时时间
  });
}
