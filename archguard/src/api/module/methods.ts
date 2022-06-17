import axios from '../axios'
import { JMethod } from '@/types/java';
import { storage } from "@/store/storage/sessionStorage";

export function queryMethodBy(submodule: string, clazz: string) {
  const systemId = storage.getSystemId();

  return axios<JMethod[]>({
    url: `/api/systems/${systemId}/methods`,
    method: "GET",
    params: { submodule, clazz },
  });
}
