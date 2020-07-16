export type Coupling = {
  label: string;
  value: string;
  introduction: string;
};
export const couplings: Array<Coupling> = [
  {
    label: "OCA",
    value: "outerModuleCouplingAverage",
    introduction: "OCA(外部耦合平均数)",
  },
  {
    label: "OCM",
    value: "outerModuleCouplingMedian",
    introduction: "OCM(外部耦合中位数)",
  },
  {
    label: "OIA",
    value: "outerModuleInstabilityAverage",
    introduction: "OIA(外部不稳定平均数)",
  },
  {
    label: "OIM",
    value: "outerModuleInstabilityMedian",
    introduction: "OIM(外部不稳定性中位数)",
  },
  {
    label: "ICA",
    value: "innerModuleCouplingAverage",
    introduction: "ICA(内部耦合平均指数)",
  },
  {
    label: "ICM",
    value: "innerModuleCouplingMedian",
    introduction: "ICM(内部耦合中位数)",
  },
  {
    label: "IIA",
    value: "innerModuleInstabilityAverage",
    introduction: "IIA(内部不稳定性平均指数)",
  },
  {
    label: "IIM",
    value: "innerModuleInstabilityMedian",
    introduction: "IIM(内部不稳定性中位数)",
  },
];

export enum ModuleType {
  NORMAL = "normal",
  DUBBO = "dubbo",
  SPRINGCLOUD = "springCloud",
}

export type ModuleItemType = {
  label: string;
  value: ModuleType;
};

export const defaultModuleType: ModuleType = ModuleType.NORMAL;
export const moduleTypes: Array<ModuleItemType> = [
  { label: "常规", value: ModuleType.NORMAL },
  { label: "Dubbo", value: ModuleType.DUBBO },
  { label: "SpringCloud", value: ModuleType.SPRINGCLOUD },
];
