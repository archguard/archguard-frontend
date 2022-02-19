import { useGet } from "@/hooks/useGet";
import { baseURL } from "./config";

interface CircularDependency {
  count: number;
  currentPageNumber: number;
  data: string[];
}

export const useClassCircularDependency = () =>
  useGet<CircularDependency>(`${baseURL}/circular-dependency/class`);

export const useMethodCircularDependency = () =>
  useGet<CircularDependency>(`${baseURL}/circular-dependency/method`);

export const useModuleCircularDependency = () =>
  useGet<CircularDependency>(`${baseURL}/circular-dependency/module`);

export const usePackageCircularDependency = () =>
  useGet<CircularDependency>(`${baseURL}/circular-dependency/package`);
