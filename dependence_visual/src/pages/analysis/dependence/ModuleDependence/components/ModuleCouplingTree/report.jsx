import React, { useMemo } from "react";
import CouplingList from "./list";

const moduleMapping = {
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
    name: "IIA",
    desc: "IIA(内部不稳定性中位数)",
  },
};

const packageMapping = {
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
        list: module.packageMetrics.map((pkg, index) => {
          return {
            key: `package_${index}`,
            label: "包名",
            name: pkg.packageName,
            shortName: pkg.packageName.replace(`${module.moduleName}.`, ""),
            props: mappingProps(pkg, packageMapping),
            list: pkg.classMetrics.map((cls, index) => {
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
