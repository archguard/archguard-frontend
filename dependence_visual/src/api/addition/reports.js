import axios from "../axios";
import { baseURL } from './config'

export function queryBadSmells() {
    return axios({
        baseURL: baseURL,
        url: "/reports/bad-smells",
        method: "GET"
    });
}

export function queryCodeStyles() {
    return axios({
        baseURL: baseURL,
        url: "/checkstyle/overview",
        method: "GET"
    });
}

export function queryTestBadSmells() {
    return axios({
        baseURL: baseURL,
        url: "/reports/test-bad-smells",
        method: "GET"
    });
}


export function queryTestCoverages() {
    return axios({
        baseURL: baseURL,
        url: "/coverage/bundle",
        method: "GET"
    });
}

export function queryTestCoverageRateBetween(parameter) {
    return axios({
        baseURL: baseURL,
        url: "/coverage/rateBetween",
        method: "GET",
        params: parameter
    })
}

export function queryTestCoverageTop(parameter) {
    return axios({
        baseURL: baseURL,
        url: "/coverage/top",
        method: "GET",
        params: parameter
    })
}
