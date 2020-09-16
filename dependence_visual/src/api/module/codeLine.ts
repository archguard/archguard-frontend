import { BadSmellType, DashboardGroup } from '@/pages/MeasureIndicators/Components/ChartCard';
import { IndicatorLevel } from '@/pages/MeasureIndicators/Components/Group';
import { storage } from '@/store/storage/sessionStorage';
import { useGet } from '../axios';
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
  type: keyof typeof BadSmellType;
  level: IndicatorLevel;
  graphData: Array<{
    date: string;
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

export const useDashboard = () => useGet<MeasureIndicatorsData>(`${baseURL}/dashboard`);
