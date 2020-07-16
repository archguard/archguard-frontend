import React, { useMemo } from "react";
import CouplingList from "./list";

const moduleMapping = {
  outerModuleInstabilityAverage: {
    name: "OIA",
    desc: "OIA(外部不稳定平均数)",
  },
  outerModuleInstabilityMedian: {
    name: "OIM",
    desc: "OIM(外部不稳定中位数)",
  },
  outerModuleCouplingAverage: {
    name: "OCA",
    desc: "OCA(外部耦合平均数)",
  },
  outerModuleCouplingMedian: {
    name: "OCM",
    desc: "OCM(外部耦合中位数)",
  },
  innerModuleCouplingAverage: {
    name: "ICA",
    desc: "ICA(内部耦合平均数)",
  },
  innerModuleCouplingMedian: {
    name: "ICM",
    desc: "ICA(内部耦合中位数)",
  },
  innerModuleInstabilityAverage: {
    name: "IIA",
    desc: "IIA(内部不稳定性平均数)",
  },
  innerModuleInstabilityMedian: {
    name: "IIA",
    desc: "IIA(内部不稳定性中位数)",
  },
};

const packageMapping = {
  outerPackageInstabilityAverage: {
    name: "OIA",
    desc: "OIA(外部不稳定平均数)",
  },
  outerPackageInstabilityMedian: {
    name: "OIM",
    desc: "OIM(外部不稳定中位数)",
  },
  outerPackageCouplingAverage: {
    name: "OCA",
    desc: "OCA(外部耦合平均数)",
  },
  outerPackageCouplingMedian: {
    name: "OCM",
    desc: "OCM(外部耦合中位数)",
  },
  innerPackageCouplingAverage: {
    name: "ICA",
    desc: "ICA(内部耦合平均数)",
  },
  innerPackageCouplingMedian: {
    name: "ICM",
    desc: "ICA(内部耦合中位数)",
  },
  innerPackageInstabilityAverage: {
    name: "IIA",
    desc: "IIA(内部不稳定性平均数)",
  },
  innerPackageInstabilityMedian: {
    name: "IIA",
    desc: "IIA(内部不稳定性中位数)",
  },
};

const classMapping = {
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
  innerClassInstability: {
    name: "II",
    desc: "II(内部不稳定性)",
  },
  innerClassCoupling: {
    name: "IC",
    desc: "IC(内部耦合度)",
  },
  outerClassInstability: {
    name: "OI",
    desc: "OI(外部不稳定性)",
  },
  outerClassCoupling: {
    name: "OC",
    desc: "OC(外部耦合度)",
  },
};

function mappingProps(item, mapping) {
  const props = Object.keys(mapping).map((key) => {
    const { desc, name } = mapping[key];
    let value = item[key];
    if (typeof value === "number") {
      value = value.toFixed(2);
    }
    return { desc, name, value, key };
  });
  return props;
}

export default function Report(props) {
  const { data = [] } = props;
  const reportData = useMemo(() => {
    return data.map((module, index) => {
      return {
        key: `module_${index}`,
        label: "模块名",
        name: module.moduleName,
        props: mappingProps(module, moduleMapping),
        list: module.packageCouplingReports.map((pkg, index) => {
          return {
            key: `package_${index}`,
            label: "包名",
            name: pkg.packageName,
            shortName: pkg.packageName.replace(`${module.moduleName}.`, ""),
            props: mappingProps(pkg, packageMapping),
            list: pkg.classCouplingReports.map((cls, index) => {
              return {
                key: `class_${index}`,
                label: "类名",
                name: cls.className,
                shortName: cls.className.replace(`${pkg.packageName}.`, ""),
                props: mappingProps(cls, classMapping),
              };
            }),
          };
        }),
      };
    });
  }, [data]);

  return <CouplingList data={reportData} />;
}
