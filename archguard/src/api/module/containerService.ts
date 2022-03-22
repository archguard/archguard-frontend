import axios from "../axios";
import { storage } from "@/store/storage/sessionStorage";

const systemId = storage.getSystemId();

export function queryContainerServices() {
  return axios<any>({
    url: `/api/systems/${systemId}/container-service`,
    method: "GET"
  });
}
