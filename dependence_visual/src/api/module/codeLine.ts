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
  type: string;
  graphData: Array<{
    date: string;
    value: number;
  }>;
}
export interface MeasureIndicators {// 度量指标
  groupKey: string;
  groupData: GroupDataItem[];
}

