import axios from '../axios'
import { JMethod } from '@/models/java';
import { storage } from "@/store/storage/sessionStorage";

export function queryMethodBy(submodule: string, clazz: string) {
  return axios<JMethod[]>({
    url: `/api/systems/${(storage.getSystemId())}/methods`,
    method: "GET",
    params: { submodule, clazz },
  });
}
