import { useGet } from "@/hooks/useGet";
import { storage } from "@/store/storage/sessionStorage";

const systemId = storage.getSystemId();

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
  thresholds: BadSmellThreshold[];
}

export const useBadSmellOption = () => useGet<BadSmellOption[]>(`/api/addition/evolution/badsmell-thresholds/system/${systemId}`);
