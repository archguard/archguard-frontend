import { queryModuleDependencies, Module } from "@/api/module/module";
import CollapsibleCard from "@/components/CollapsibleCard";
import { Table } from "antd";
import React, { useMemo, useState } from "react";
import useModules from "../../../states/useModules";
import columns, { methodDependency } from "./columns";
import { FormItemOption } from '@/models/form';
import ModuleDependenceArgsForm from './ModuleDependenceArgsForm'

function getRowKey(item: any) {
  const { caller, callee } = item;
  return `${caller.fullName}-${callee.fullName}`;
}

const getModulesOption = (modules?: Module[]): FormItemOption[] => {
  if (!modules) return []
  return modules.map(module => {
    return { label: module.name, value: module.name }
  })
}

export default function ModuleDependence() {
  const [tableData, setTableData] = useState<methodDependency[]>([]);
  const [modulesValue] = useModules();
  const modulesOption = getModulesOption(modulesValue?.value)

  const onBtnClick = (args: { moduleAName: string, moduleBName: string }) => {
    queryModuleDependencies({
      caller: args.moduleAName,
      callee: args.moduleBName,
    }).then((res) => {
      setTableData(res);
    });
  }

  return (
    <CollapsibleCard title="模块间函数调用" collapsed={false}>
      <div key="module-function-invoke">
        <ModuleDependenceArgsForm
          options={modulesOption}
          onFinish={onBtnClick}></ModuleDependenceArgsForm>
        <Table columns={columns} dataSource={tableData} bordered rowKey={getRowKey} />
      </div>
    </CollapsibleCard>
  );
}
