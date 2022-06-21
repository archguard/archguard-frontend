import axios from "@/api/axios";

export function scaInsight() {
  return axios({
    url: `/api/insights/sca`,
    method: "POST",
    data: {
      systemId: 1,
      expression: "field:version == 'sample'"
    }
  });
}
