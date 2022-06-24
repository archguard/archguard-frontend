import axios from "@/api/axios";

export interface CustomInsight {
  id: number;
  systemId: number;
  name: string;
  expression: string;
  schedule: string;
}

export function snapshotInsight(data: any) {
  return axios({
    url: `/api/insights/snapshot`,
    method: "POST",
    data: data,
  });
}

export function customInsight(data: any) {
  return axios({
    url: `/api/insights/custom-insight`,
    method: "POST",
    data: data,
  });
}

export function listInsights() {
  return axios({
    url: `/api/insights/`,
    method: "GET",
  });
}

export function getByName(name: string) {
  return axios<CustomInsight>({
    url: `/api/insights/custom-insight/${name}`,
    method: "GET",
  });
}

export function deleteInsightByName(name: string) {
  return axios<CustomInsight>({
    url: `/api/insights/custom-insight/${name}`,
    method: "DELETE",
  });
}
