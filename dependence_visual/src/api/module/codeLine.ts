import { Color } from "@/components/Business/Grade/Grade";
import { useGet } from "@/hooks/useGet";
import {
  badSmellWordingKeys,
  DashboardGroup,
} from "@/pages/systemSummary/MeasureIndicators/Components/ChartCard";
import { IndicatorLevel } from "@/pages/systemSummary/MeasureIndicators/Components/Group";
import { LEVEL_SCORE } from "@/pages/systemSummary/Summary/components/QualityEvaluation";
import { storage } from "@/store/storage/sessionStorage";
import { axiosWithModule } from "./config";

const systemId = storage.getSystemId();
export const baseURL = `/api/module/systems/${systemId}`;

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
  return axiosWithModule<MethodLinesPagedDataResponse>({
    url: "/codeline/methods/above-threshold",
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

export const useDashboard = () => useGet<MeasureIndicatorsData[]>(`${baseURL}/dashboard`);

interface UseOverviewCount {
  repoCount: number;
  moduleCount: number;
  lineCount: number;
  contributorCount: number;
  qualityLevel: keyof typeof Color;
}
export const useOverviewCount = () => useGet<UseOverviewCount>(`${baseURL}/overview/system`);

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
  const { data, run } = useGet<UseOverview>(`${baseURL}/overview`);
  return {
    data: data?.data || [],
    run,
  };
}
