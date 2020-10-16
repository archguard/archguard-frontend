import { storage } from "@/store/storage/sessionStorage";
import { axiosWithBaseURL } from "../axios";

const systemId = storage.getSystemId();
export const baseURL = `/api/module/systems/${systemId}`;
export const axiosWithModule = axiosWithBaseURL(baseURL);
