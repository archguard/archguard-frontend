import axios from "../axios";
import { baseURL } from "./config";

export function transformPlsqlToKotlin(packageName, plsqlCode) {
  return axios({
    baseURL: baseURL,
    url: "/plsql/kotlin",
    method: "POST",
    data: {
      pkgName : packageName,
      plSqlCode: plsqlCode
    }
  });
}
