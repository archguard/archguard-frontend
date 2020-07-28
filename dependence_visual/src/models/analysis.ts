export interface BaseMetric {
  outerInstabilityAvg: number;
  outerInstabilityMed: number;
  outerCouplingAvg: number;
  outerCouplingMed: number;
  innerInstabilityAvg: number;
  innerInstabilityMed: number;
  innerCouplingAvg: number;
  innerCouplingMed: number;
}

export interface ClassMetrics {
  id: number;
  packageId: number;
  className: string;
  innerFanIn: number;
  innerFanOut: number;
  outerFanIn: number;
  outerFanOut: number;
  innerInstability: number;
  innerCoupling: number;
  outerInstability: number;
  outerCoupling: number;
}

export type PackageMetrics = BaseMetric & {
  id: number;
  moduleId: number;
  packageName: string;
  classMetrics: ClassMetrics[];
};

export type ModuleMetric = BaseMetric & {
  id: number;
  moduleName: string;
  packageMetrics: PackageMetrics[];
};
