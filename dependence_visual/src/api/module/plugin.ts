import axios from "../axios";
import { baseURL } from './config'

export function queryPluginTypes() {
    return axios<string[]>({
        baseURL: baseURL,
        url: "/plugin/type",
        method: "GET"
    });
}
