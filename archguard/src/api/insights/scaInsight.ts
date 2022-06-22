import axios from "@/api/axios";

export function scaInsight(data: any) {
  return axios({
    url: `/api/insights/sca`,
    method: "POST",
    data: data
  });
}
