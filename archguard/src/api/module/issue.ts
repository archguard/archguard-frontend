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

interface IssuePosition {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

export function getAllIssue(id: number) {
  return axios<Issue[]>({
    url: `/api/systems/${id}/issue`,
    method: "GET",
  });
}
