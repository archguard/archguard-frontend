import axios from "../axios";
import { baseURL } from './config'

export function queryPackageDependencies() {
    return axios({
        baseURL: baseURL,
        url: "/package/dependencies",
        method: "GET"
    });
}
