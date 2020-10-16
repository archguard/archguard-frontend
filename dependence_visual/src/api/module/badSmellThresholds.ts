import { useGet } from "@/hooks/useGet";
import { baseURL } from "./config";

export interface BadSmellThreshold {
  name: string;
  threshold: Array<{
    name: string;
    condition: string;
    value: number;
  }>;
}

export interface BadSmellOption {
  id: string;
  title: string;
  selected: boolean;
  thresholds: BadSmellThreshold[];
}

export const useBadSmellOption = () => useGet<BadSmellOption[]>(`${baseURL}/badsmell-thresholds`);
