import { Color } from "@/components/Business/Grade/Grade";
import { useGet } from "@/hooks/useGet";
import { badSmellWordingKeys, DashboardGroup, } from "@/pages/system/systemEvolving/MeasureIndicators/Components/ChartCard";
import { IndicatorLevel } from "@/pages/system/systemEvolving/MeasureIndicators/Components/Group";
import { storage } from "@/store/storage/sessionStorage";
import axios from '../axios';

export interface MethodLines {
  moduleName: string;
  packageName: string;
  typeName: string;
  methodName: string;
  systemId: number;
  lines: number;
}

interface MethodLinesPagedDataResponse {
  count: number;
  currentPageNumber: number;
  data: MethodLines[];
}

export function getOverviewUsingMethods(currentPageNumber: number, numberPerPage: number) {
  const systemId = storage.getSystemId();

  return axios<MethodLinesPagedDataResponse>({
    url: `/api/systems/${systemId}/codeline/methods/above-threshold`,
    method: "GET",
    params: { currentPageNumber, numberPerPage },
  });
}

export interface GroupDataItem {
  type: badSmellWordingKeys;
  level: IndicatorLevel;
  graphData: Array<{
    date: string;
    value: number;
  }>;
}
export interface MeasureIndicatorsData {
  // 度量指标
  dashboardGroup: keyof typeof DashboardGroup;
  groupData: GroupDataItem[];
}

export const useDashboard = () => {
  const systemId = storage.getSystemId();
  return useGet<MeasureIndicatorsData[]>(`/api/systems/${ systemId }/dashboard`);
};

interface LineCount {
  lineCount: number,
  fileCount: number,
  language: String
}

interface UseOverviewCount {
  repoCount: number;
  moduleCount: number;
  lineCounts: LineCount[];
  contributorCount: number;
  qualityLevel: keyof typeof Color;
}
export const useOverviewCount = () => {
  const systemId = storage.getSystemId();
  return useGet<UseOverviewCount>(`/api/systems/${ systemId }/overview/system`);
};

export const LEVEL_SCORE = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
} as const;

export interface Overview {
  level: keyof typeof LEVEL_SCORE;
  badSmell: string;
  category: string;
  count: number;
}
interface UseOverview {
  data: Overview[];
}

export function useOverview() {
  const systemId = storage.getSystemId();

  const { data, run } = useGet<UseOverview>(`/api/systems/${systemId}/overview`);
  return {
    data: data?.data || [],
    run,
  };
}
