import axios from '../axios'
import { JMethod } from '@/models/java';
import { storage } from "@/store/storage/sessionStorage";

const systemId = storage.getSystemId();

export function queryMethodBy(submodule: string, clazz: string) {
  return axios<JMethod[]>({
    baseURL: `/api/systems/${systemId}`,
    url: '/methods',
    method: "GET",
    params: { submodule, clazz },
  });
}
