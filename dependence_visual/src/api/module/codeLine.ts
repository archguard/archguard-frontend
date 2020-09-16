import { BadSmellType, DashboardGroup } from '@/pages/MeasureIndicators/Components/ChartCard';
import { axiosWithModule } from "./config";

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
  type: keyof typeof BadSmellType;
  graphData: Array<{
    data: string;
    value: number;
  }>;
}
export interface MeasureIndicatorsData {// 度量指标
  dashboardGroup: keyof typeof DashboardGroup;
  groupData: GroupDataItem[];
}

export function getDashboard() {
  return axiosWithModule<MeasureIndicatorsData[]>({
    url: "/dashboard",
    method: "GET",
  });
}

