import { Color } from "@/components/Business/Grade/Grade";
import { useGet } from "@/hooks/useGet";
import { badSmellWordingKeys, DashboardGroup, } from "@/pages/systemEvolving/MeasureIndicators/Components/ChartCard";
import { IndicatorLevel } from "@/pages/systemEvolving/MeasureIndicators/Components/Group";
import { LEVEL_SCORE } from "@/pages/systemSummary/Summary/components/QualityEvaluation";
import { storage } from "@/store/storage/sessionStorage";
import axios from '../axios';

const systemId = storage.getSystemId();

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

export const useDashboard = () => useGet<MeasureIndicatorsData[]>(`/api/systems/${systemId}/dashboard`);

interface LineCount {
  lineCount: number,
  language: String
}

interface UseOverviewCount {
  repoCount: number;
  moduleCount: number;
  lineCounts: LineCount[];
  contributorCount: number;
  qualityLevel: keyof typeof Color;
}
export const useOverviewCount = () => useGet<UseOverviewCount>(`/api/systems/${systemId}/overview/system`);

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
  const { data, run } = useGet<UseOverview>(`/api/systems/${systemId}/overview`);
  return {
    data: data?.data || [],
    run,
  };
}
