import { storage } from "@/store/storage/sessionStorage";
import { axiosWithBaseURL } from "../axios";

const systemId = storage.getSystemId();
export const axiosWithModule = axiosWithBaseURL(`/api/systems/${systemId}`);
