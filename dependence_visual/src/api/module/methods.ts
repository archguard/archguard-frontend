import axios from '../axios'
import { baseURL } from './config'
import { JMethod } from '@/models/java';

export function queryMethodBy(submodule: string, clazz: string) {
  return axios<JMethod[]>({
    baseURL,
    url: '/methods',
    method: "GET",
    params: { submodule, clazz },
  });
}
