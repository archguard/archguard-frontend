import { useGet } from "@/hooks/useGet";
import { storage } from "@/store/storage/sessionStorage";

interface CircularDependency {
  count: number;
  currentPageNumber: number;
  data: string[];
}

const systemId = storage.getSystemId();
export const useClassCircularDependency = () =>
  useGet<CircularDependency>(`/api/systems/${systemId}/circular-dependency/class`);

export const useMethodCircularDependency = () =>
  useGet<CircularDependency>(`/api/systems/${systemId}/circular-dependency/method`);

export const useModuleCircularDependency = () =>
  useGet<CircularDependency>(`/api/systems/${systemId}/circular-dependency/module`);

export const usePackageCircularDependency = () =>
  useGet<CircularDependency>(`/api/systems/${systemId}/circular-dependency/package`);
