import axios from "../axios";
import { storage } from '@/store/storage/sessionStorage'

const projectId = storage.getProjectId()

export function scanDependence() {
  return axios({
    url: `/api/scanner/projects/${projectId}/dependency-analyses`,
    method: "POST",
    timeout: 180000, // 请求超时时间
  });
}
