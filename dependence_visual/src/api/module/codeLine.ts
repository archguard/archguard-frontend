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

export enum DashboardGroup {
  COUPLING = '耦合维度',
  SIZING = '体量维度'
}

export enum BadSmellType {
  DATACLUMPS = '数据泥团',
  DEEPINHERITANCE = '过深继承',
  SIZINGMODULES = '过大的模块',
  SIZINGPACKAGE = '过大的包',
  SIZINGCLASS = '过大的类',
  SIZINGMETHOD = '过大的方法'
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

