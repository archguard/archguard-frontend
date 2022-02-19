export type SystemEvaluationHistoryType = {
  comment: string;
  createdDate: string;
  dimensions: { name: string; reportDms: { [key: string]: string } }[];
  id: string;
  improvements: string[];
  name: string;
};
