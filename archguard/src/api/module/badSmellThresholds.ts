import { useGet } from "@/hooks/useGet";
import { storage } from "@/store/storage/sessionStorage";

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
  suiteName: string;
  isDefault: boolean;
  isSelected: boolean;
  thresholds: BadSmellThreshold[];
}

export interface AllBadSmellOption {
  id: string;
  suiteName: string;
  isDefault: boolean;
  thresholds: BadSmellThreshold[];
}


export const useBadSmellOption = () => {
  const systemId = storage.getSystemId();
  return useGet<BadSmellOption[]>(`/api/evolution/badsmell-thresholds/system/${systemId}`);
}

export const useAllBadSmellOption = () => useGet<AllBadSmellOption[]>(`/api/evolution/badsmell-thresholds`);
