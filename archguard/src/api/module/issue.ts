import axios from "../axios";

interface Issue {
  ruleId: string;
  position: string;
  name: string;
  detail: string;
  ruleType: string;
  severity: string;
  fullName: string;
  source: string;
}

export function getAllIssue(id: number) {
  return axios<Issue[]>({
    url: `/api/systems/${id}/issue`,
    method: "GET",
  });
}
