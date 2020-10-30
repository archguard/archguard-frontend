import { useGet } from "@/hooks/useGet";

export interface AllBadSmellThreshold {
  name: string;
  threshold: Array<{
    name: string;
    condition: string;
    value: number;
  }>;
}

export interface AllBadSmellOption {
  id: string;
  isDefault: boolean;
  suiteName: string;
  selected: boolean;
  thresholds: AllBadSmellThreshold[];
}

export const useAllBadSmellOption = () => useGet<AllBadSmellOption[]>(`/api/addition/evolution/badsmell-thresholds`);
