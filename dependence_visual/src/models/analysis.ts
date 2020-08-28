export interface BaseMetric {
  outerInstabilityAvg?: number;
  outerInstabilityMed?: number;
  outerCouplingAvg?: number;
  outerCouplingMed?: number;
  innerInstabilityAvg?: number;
  innerInstabilityMed?: number;
  innerCouplingAvg?: number;
  innerCouplingMed?: number;
}

export interface ClassMetrics {
  id: string;
  packageId: string;
  className: string;
  innerFanIn?: number;
  innerFanOut?: number;
  outerFanIn?: number;
  outerFanOut?: number;
  innerInstability?: number;
  innerCoupling?: number;
  outerInstability?: number;
  outerCoupling?: number;
}

export type PackageMetrics = BaseMetric & {
  id: string;
  moduleId: string;
  packageName: string;
  classMetrics?: ClassMetrics[];
  packageMetrics?: PackageMetrics[];
};

export type ModuleMetric = BaseMetric & {
  id: string;
  moduleName: string;
  packageMetrics: PackageMetrics[];
  classMetrics: ClassMetrics[];
};
