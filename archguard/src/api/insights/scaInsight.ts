import axios from "@/api/axios";

export function scaInsight(data: any) {
  return axios({
    url: `/api/insights/sca`,
    method: "POST",
    data: data
  });
}

export function customInsight(data: any) {
  return axios({
    url: `/api/insights/custom-insight`,
    method: "POST",
    data: data
  });
}

export function listInsights() {
  return axios({
    url: `/api/insights/`,
    method: "GET",
  });
}
