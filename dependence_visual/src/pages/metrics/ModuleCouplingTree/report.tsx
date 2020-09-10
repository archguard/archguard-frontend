import { MetricProps, Metric } from "@/models/analysis";
import React, { useMemo, useState } from "react";
import CouplingList, { CouplingRecord } from "./coupling-list";
import { Profile, ProfileConfig } from "@/pages/quality-gate-profile";
import {
  queryPackageCoupling,
  queryClassCoupling,
  queryAllModuleCoupling,
} from "@/api/module/metric";
import { useMount } from "react-use";

export interface ReportMapper {
  [key: string]: { name: string; desc: string };
}

export enum Layer {
  MODULE = "MODULE",
  PACKAGE = "PACKAGE",
  CLASS = "CLASS",
  COUPLINGS = "COUPLINGS",
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

const getDefaultProps = (mapping: ReportMapper): MetricProps[] => {
  return Object.keys(mapping).map((key) => {
    const { desc, name } = mapping[key];

    return { desc, name, value: null, key, qualified: true };
  });
};

const moduleDefaultProps = getDefaultProps(moduleMapping);
const packageDefaultProps = getDefaultProps(packageMapping);
const classDefaultProps = getDefaultProps(classMapping);

export const mappingProps = (
  item: any,
  mapping: ReportMapper,
  layer: LayerKeys,
  qualityGates?: ProfileConfig[],
): MetricProps[] => {
  if (!item) {
    return [];
  }
  const props = Object.keys(mapping).map((key) => {
    const { desc, name } = mapping[key];
    let value = item[key];
    let qualified = false;
    if (typeof value === "number") {
      value = value.toFixed(2);
      const qualityGate = qualityGates?.find((q) => q.quota === name && q.layer === layer);
      qualified = isGoodQualitiy(value, qualityGate);
    }
    return { desc, name, value, key, qualified };
  });
  return props;
};

const isGoodQualitiy = (value: number, qualityGateConfig?: ProfileConfig) => {

  if (!qualityGateConfig) {
    return true;
  }

  const { operator, value: gateValue } = qualityGateConfig;
  switch (operator) {
    case "BIGGER":
      return value > gateValue;
    case "EQUAL":
      return value === gateValue;
    case "LESS":
      return value < gateValue;
  }
};

export const getQuotaListByLayer = (): Quota => {
  const getQuotaList = (mapping: ReportMapper): string[] => {
    return Object.values(mapping).map((quota) => quota.name);
  };

  return {
    MODULE: getQuotaList(moduleMapping),
    PACKAGE: getQuotaList(packageMapping),
    CLASS: getQuotaList(classMapping),
    COUPLINGS: ["coupling", "instability", "fanIn", "fanOut"],
  };
};

interface ReportProps {
  nodes: SubModuleNode[];
  qualityGate?: Profile;
}

export default function Report(props: ReportProps) {
  const { nodes = [], qualityGate } = props;
  const [reportData, setReportData] = useState<CouplingRecord[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);

  const mapPackageReportData = (
    moduleId: string,
    parentPackage: string,
    packageNodes?: PackageNode[],
  ): CouplingRecord[] => {
    return packageNodes
      ? packageNodes.map((pkg, index) => {
          const pkgFullName = `${parentPackage}.${pkg.name}`;
          const metric = metrics.find(
            (x) => x.fullName === pkgFullName && x.moduleName === moduleId && x.type === "PACKAGE",
          );
          return {
            key: `package_${index}`,
            label: "包名",
            fullName: pkgFullName,
            moduleId: moduleId,
            name: pkg.name,
            props: metric?.props || packageDefaultProps,
            classess: mapClassReportData(moduleId, pkgFullName, pkg.classess),
            packages: mapPackageReportData(moduleId, pkgFullName, pkg.packages),
          };
        })
      : [];
  };

  const mapClassReportData = (
    moduleId: string,
    packageFullName: string,
    classMetrics?: ClassNode[],
  ): CouplingRecord[] => {
    return classMetrics
      ? classMetrics.map((cls, index) => {
          const classFullName = `${packageFullName}.${cls.name}`;
          const metric = metrics.find(
            (x) => x.fullName === classFullName && x.moduleName === moduleId && x.type === "CLASS",
          );
          return {
            key: `class_${index}`,
            label: "类名",
            moduleId: moduleId,
            fullName: classFullName,
            name: cls.name,
            props: metric?.props || classDefaultProps,
          };
        })
      : [];
  };

  useMemo(() => {
    const datas = nodes.map((module, index) => {
      const metric = metrics.find((x) => x.fullName === module.name && x.type === "MODULE");
      return {
        key: `module_${index}`,
        label: "模块名",
        fullName: module.name,
        moduleId: module.name,
        name: module.name,
        props: metric?.props || moduleDefaultProps,
        packages: mapPackageReportData(module.name, module.name, module.packages),
        classess: mapClassReportData(module.name, module.name, module.classess),
      };
    });

    setReportData(datas);
  }, [nodes, metrics]);

  useMemo(() => {
    metrics.forEach((metric) => {
      metric.props.forEach((p) => {
        const gateConfig = qualityGate?.config.find(
          (x) => x.layer === metric.type && x.quota === p.name,
        );
        p.qualified = isGoodQualitiy(p.value, gateConfig);
      });
    });

    setMetrics([...metrics]);
  }, [qualityGate]);

  useMount(() => {
    queryAllModuleCoupling().then((res) => {
      const metrics: Metric[] = res.map((mc) => {
        return {
          fullName: mc.logicModule.fullName,
          moduleName: mc.logicModule.name,
          type: "MODULE",
          props: mappingProps(mc, moduleMapping, "MODULE", qualityGate?.config),
        };
      });

      setMetrics(metrics);
    });
  });

  const lazyLoadPackageMetric = (record: CouplingRecord) => {
    if (
      record.packages &&
      record.packages.length > 0 &&
      record.packages.every((pkg) => !pkg.props || pkg.props.every((prop) => !prop.value))
    ) {
      const packageNames = record.packages!.map((p) => p.fullName);

      queryPackageCoupling(packageNames).then((res) => {
        record.packages!.forEach((p) => {
          const packageName = p.fullName.replace(`${record.moduleId}.`, "");
          const metric = res.find((x) => x.packageVO.packageName === packageName);
          if (metric) {
            const props = mappingProps(metric, packageMapping, "PACKAGE", qualityGate?.config);
            metrics.push({
              fullName: p.fullName,
              moduleName: record.moduleId,
              type: "PACKAGE",
              props: props,
            });
          }
        });
        setMetrics([...metrics]);
      });

    }
  };

  const lazyLoadClassMetric = (record: CouplingRecord) => {
    if (
      record.classess &&
      record.classess.length > 0 &&
      record.classess.every((c) => !c.props || c.props.every((prop) => !prop.value))
    ) {
      queryClassCoupling(record.moduleId, record.fullName.replace(`${record.moduleId}.`, "")).then(
        (res) => {
          record.classess!.forEach((c) => {
            const metric = res.find((x) => x.jclassVO.fullName === c.fullName);

            if (metric) {
              const props = mappingProps(metric, classMapping, "CLASS", qualityGate?.config);
              metrics.push({
                fullName: c.fullName,
                moduleName: record.moduleId,
                type: "CLASS",
                props: props,
              });
            }
          });
          setMetrics([...metrics]);
        },
      );
    }
  };

  const onExpand = (expanded: boolean, record: CouplingRecord) => {
    if (expanded) {
      lazyLoadPackageMetric(record);

      lazyLoadClassMetric(record);
    }
  };

  return <CouplingList data={reportData} exportable onExpand={onExpand} />;
}
