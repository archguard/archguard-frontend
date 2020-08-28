import { ModuleMetric, PackageMetrics, ClassMetrics } from "@/models/analysis";
import React, { useMemo } from "react";
import CouplingList, { CouplingRecord } from "./coupling-list";

export interface ReportMapper {
  [key: string]: { name: string; desc: string };
}

export enum Layer {
  MODULE = "MODULE",
  PACKAGE = "PACKAGE",
  CLASS = "CLASS",
}

export type LayerKeys = keyof typeof Layer;
export type Quota = {
  [key in LayerKeys]: string[];
};

export const moduleMapping: ReportMapper = {
  outerInstabilityAvg: {
    name: "OIA",
    desc: "OIA(外部不稳定平均数)",
  },
  outerInstabilityMed: {
    name: "OIM",
    desc: "OIM(外部不稳定中位数)",
  },
  outerCouplingAvg: {
    name: "OCA",
    desc: "OCA(外部耦合平均数)",
  },
  outerCouplingMed: {
    name: "OCM",
    desc: "OCM(外部耦合中位数)",
  },
  innerCouplingAvg: {
    name: "ICA",
    desc: "ICA(内部耦合平均数)",
  },
  innerCouplingMed: {
    name: "ICM",
    desc: "ICA(内部耦合中位数)",
  },
  innerInstabilityAvg: {
    name: "IIA",
    desc: "IIA(内部不稳定性平均数)",
  },
  innerInstabilityMed: {
    name: "IIM",
    desc: "IIM(内部不稳定性中位数)",
  },
};

export const packageMapping: ReportMapper = {
  outerInstabilityAvg: {
    name: "OIA",
    desc: "OIA(外部不稳定平均数)",
  },
  outerInstabilityMed: {
    name: "OIM",
    desc: "OIM(外部不稳定中位数)",
  },
  outerCouplingAvg: {
    name: "OCA",
    desc: "OCA(外部耦合平均数)",
  },
  outerCouplingMed: {
    name: "OCM",
    desc: "OCM(外部耦合中位数)",
  },
  innerCouplingAvg: {
    name: "ICA",
    desc: "ICA(内部耦合平均数)",
  },
  innerCouplingMed: {
    name: "ICM",
    desc: "ICM(内部耦合中位数)",
  },
  innerInstabilityAvg: {
    name: "IIA",
    desc: "IIA(内部不稳定性平均数)",
  },
  innerInstabilityMed: {
    name: "IIM",
    desc: "IIM(内部不稳定性中位数)",
  },
};

export const classMapping: ReportMapper = {
  innerFanIn: {
    name: "IFI",
    desc: "innerFanIn",
  },
  innerFanOut: {
    name: "IFO",
    desc: "innerFanOut",
  },
  outerFanIn: {
    name: "OFI",
    desc: "outerFanIn",
  },
  outerFanOut: {
    name: "OFO",
    desc: "outerFanOut",
  },
  innerInstability: {
    name: "II",
    desc: "II(内部不稳定性)",
  },
  innerCoupling: {
    name: "IC",
    desc: "IC(内部耦合度)",
  },
  outerInstability: {
    name: "OI",
    desc: "OI(外部不稳定性)",
  },
  outerCoupling: {
    name: "OC",
    desc: "OC(外部耦合度)",
  },
};

export const mappingProps = (item: any, mapping: ReportMapper) => {
  const props = Object.keys(mapping).map((key) => {
    const { desc, name } = mapping[key];
    let value = item[key];
    if (typeof value === "number") {
      value = value.toFixed(2);
    }
    return { desc, name, value, key };
  });
  return props;
};

export const getQuotaListByLayer = (): Quota => {
  const getQuotaList = (mapping: ReportMapper): string[] => {
    return Object.values(mapping).map((quota) => quota.name);
  };

  return {
    MODULE: getQuotaList(moduleMapping),
    PACKAGE: getQuotaList(packageMapping),
    CLASS: getQuotaList(classMapping),
  };
};

interface ReportProps {
  data: ModuleMetric[];
}

export default function Report(props: ReportProps) {
  const { data = [] } = props;
  const mapPackageReportData = (packageMetrics?: PackageMetrics[]): CouplingRecord[] => {
    return packageMetrics
      ? packageMetrics.map((pkg, index) => {
          return {
            key: `package_${index}`,
            label: "包名",
            fullName: pkg.id,
            moduleId: pkg.moduleId,
            name: pkg.packageName,
            shortName: pkg.packageName,
            props: mappingProps(pkg, packageMapping),
            classess: mapClassReportData(pkg.moduleId, pkg.classMetrics),
            packages: mapPackageReportData(pkg.packageMetrics),
          };
        })
      : [];
  };

  const mapClassReportData = (
    moduleId: string,
    classMetrics?: ClassMetrics[],
  ): CouplingRecord[] => {
    return classMetrics
      ? classMetrics.map((cls, index) => {
          return {
            key: `class_${index}`,
            label: "类名",
            moduleId: moduleId,
            fullName: cls.id,
            name: cls.className,
            shortName: cls.className,
            props: mappingProps(cls, classMapping),
          };
        })
      : [];
  };
  const reportData = useMemo(() => {
    return data.map((module, index) => {
      return {
        key: `module_${index}`,
        label: "模块名",
        fullName: module.id,
        moduleId: module.id,
        name: module.moduleName,
        props: mappingProps(module, moduleMapping),
        packages: mapPackageReportData(module.packageMetrics),
        classess: mapClassReportData(module.id, module.classMetrics),
      };
    });
  }, [data]);

  return <CouplingList data={reportData} exportable />;
}
