import CollapsibleCard from "@/components/CollapsibleCard";
import QuestionCircleOutlined from "@ant-design/icons/lib/icons/QuestionCircleOutlined";
import { Button } from "antd";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Report from "./report";
import useCodeTree from "@/store/global-cache-state/useCodeTree";
import { expandCodeTree } from "@/utils/transformCodeTree";
import { queryAllModuleCoupling } from "@/api/module/metric";
import { PackageMetrics, ClassMetrics } from "@/models/analysis";

function ModuleCouplingTable() {
  const [codeTree] = useCodeTree();

  const [moduleMetric, setModuleMetric] = useState<any>([]);

  interface SubModuleOrPackageNode {
    name: string;
    packages?: SubModuleOrPackageNode[];
    classess?: ClassNode[];
  }

  interface ClassNode {
    name: string;
  }

  const mergeModuleTreeAndMetric = (tree: SubModuleNode[], metrics: ModuleCoupling[]) => {
    return tree.map((module) => {
      const metric = metrics.find((x) => x && x.logicModule.name === module.name);
      return {
        id: module.name,
        moduleName: module.name,
        packageMetrics: module.packages?.map((p) => {
          return mapToPackageMetric(module.name, module.name, p);
        }),
        classMetrics: module.classess?.map((c) => {
          return mapToClassMetric(module.name, c);
        }),
        ...metric,
      };
    });
  };

  const mapToPackageMetric = (
    moduleId: string,
    parentPackage: string,
    packageNode: PackageNode,
  ): PackageMetrics => {
    return {
      id: `${parentPackage}.${packageNode.name}`,
      packageName: packageNode.name,
      moduleId: moduleId,
      classMetrics: packageNode.classess?.map((c) =>
        mapToClassMetric(`${parentPackage}.${packageNode.name}`, c),
      ),
      packageMetrics: packageNode.packages?.map((p) =>
        mapToPackageMetric(moduleId, `${parentPackage}.${packageNode.name}`, p),
      ),
    };
  };

  const mapToClassMetric = (packageId: string, classNode: ClassNode): ClassMetrics => {
    return {
      id: `${packageId}.${classNode.name}`,
      packageId: packageId,
      className: classNode.name,
    };
  };

  function showAllModuleCoupling() {
    const tree = codeTree?.value!;

    const nodeTree = expandCodeTree(tree);

    queryAllModuleCoupling().then((res) => {
      const moduleMetric = mergeModuleTreeAndMetric(nodeTree, res);
      setModuleMetric(moduleMetric);
    });
  }

  return (
    <CollapsibleCard
      title={
        <Fragment>
          模块耦合度
          <Link
            to={{
              pathname: "/help/module-coupling",
            }}
            target="_blank"
          >
            {" "}
            <QuestionCircleOutlined />
          </Link>
        </Fragment>
      }
      collapsed={true}
    >
      <div>
        <Button
          type="primary"
          onClick={() => showAllModuleCoupling()}
          style={{ marginBottom: "16px" }}
        >
          查询
        </Button>
        {moduleMetric!.length > 0 && <Report data={moduleMetric} />}
      </div>
    </CollapsibleCard>
  );
}

export default ModuleCouplingTable;
