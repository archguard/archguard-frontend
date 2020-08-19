import axios from '../axios'
import { baseURL } from './config';

export function getCodeTree() {
  return axios<CodeTree>({
    baseURL: baseURL,
    url: "/code-tree/",
    method: "GET"
  });
}
