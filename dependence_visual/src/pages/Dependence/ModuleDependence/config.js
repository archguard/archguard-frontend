export const couplings = [
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

export const defaultModuleType = "normal";
export const moduleTypes = [
  { label: "常规", value: "normal" },
  { label: "Dubbo", value: "dubbo" },
  { label: "SpringCloud", value: "springCloud" },
];
