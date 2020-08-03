import { queryModuleDependencies } from "@/api/module/module";
import ArgsArea, { ArgsAreaButton, argsType } from "@/components/ArgsArea";
import CollapsibleCard from "@/components/CollapsibleCard";
import { Table } from "antd";
import React, { useMemo, useState } from "react";
import useModules from "../../../states/useModules";
import columns, { methodDependency } from "./columns";
import { buildFormItems } from "./config";
import { Validator } from '@/models/form';

function filterData(data: methodDependency[], dataIndex: string, value: string, matchType: string) {
  if (!value) return data;
  if (!matchType) matchType = "fuzz";

  if (matchType === "fuzz") {
    return data.filter((item: any) => {
      return item[dataIndex].indexOf(value) !== -1;
    });
  }

  if (matchType === "exact") {
    return data.filter((item: any) => {
      return item[dataIndex] === value;
    });
  }

  return data;
}

function getRowKey(item: any) {
  const { caller, callee } = item;
  console.log(item, caller, callee, 'callercallee');
  return `${caller.fullName}-${callee.fullName}`;
}

const defaultFormData = {
  matchType: "fuzz",
  dependenceType: "callerClass",
}

export default function ModuleDependence() {
  const [tableData, setTableData] = useState<methodDependency[]>([]);
  const [modulesValue] = useModules();
  const modules = modulesValue?.value

  const buttons = useMemo((): ArgsAreaButton[] => {
    return [
      {
        text: "查询",
        id: "show",
        span: 2,
        float: "right",
        type: "primary",
        onClick: (args: argsType, validate: Validator) => {
          if (!validate.isValidate) return;
          queryModuleDependencies({
            caller: args.moduleAName,
            callee: args.moduleBName,
          }).then((res) => {
            setTableData(filterData(res, args.dependenceType, args.className!, args.matchType));
          });
        },
      },
    ];
  }, [setTableData]);

  const formItems = useMemo(() => {
    return buildFormItems(modules!);
  }, [modules]);

  return (
    <CollapsibleCard title="模块间函数调用" collapsed={true}>
      <div key="module-function-invoke">
        <ArgsArea formItems={formItems} buttons={buttons} defaultFormData={defaultFormData} />
        <Table columns={columns} dataSource={tableData} bordered rowKey={getRowKey} />
      </div>
    </CollapsibleCard>
  );
}
