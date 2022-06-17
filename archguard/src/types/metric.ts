type ModuleCoupling = {
  innerCouplingAvg: number;
  innerCouplingMed: number;
  innerInstabilityAvg: number;
  innerInstabilityMed: number;
  outerCouplingAvg: number;
  outerCouplingMed: number;
  outerInstabilityAvg: number;
  outerInstabilityMed: number;
  logicModule: {
    fullName: string;
    name: string;
  };
};

type PackageCoupling = {
  innerCouplingAvg: number;
  innerCouplingMed: number;
  innerInstabilityAvg: number;
  innerInstabilityMed: number;
  outerCouplingAvg: number;
  outerCouplingMed: number;
  outerInstabilityAvg: number;
  outerInstabilityMed: number;
  packageVO: {
    packageName: string;
    module: string;
  };
};

type ClassCoupling = {
  innerCoupling: number;
  innerFanIn: number;
  innerFanOut: number;
  innerInstability: number;
  outerCoupling: number;
  outerFanIn: number;
  outerFanOut: number;
  outerInstability: number;
  jclassVO: {
    name: string;
    module: string;
    fullName: string;
    type: string;
    packageName: string;
  };
};
