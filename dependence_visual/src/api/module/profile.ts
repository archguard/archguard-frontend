import axios from "../axios";
import { baseURL } from './config'
import { Profile } from '@/pages/quality-gate-profile';


export function queryAllQualityGateProfile() {
  return axios<any>({
      baseURL: baseURL,
      url: "quality-gate-profile",
      method: "GET"
  });
}

export function createQualityGateProfile(params: Profile) {
  return axios<any>({
    baseURL: baseURL,
    url: "quality-gate-profile",
    method: "POST",
    data: params,
  });
}

export function updateQualityGateProfile(id: number, params: Profile) {
  return axios<any>({
    baseURL: baseURL,
    url: `quality-gate-profile/${id}`,
    method: "PUT",
    data: params,
  });
}

export function deleteQualityGateProfile(id: number) {
  return axios<any>({
    baseURL: baseURL,
    url: `quality-gate-profile/${id}`,
    method: "DELETE",
  });
}
