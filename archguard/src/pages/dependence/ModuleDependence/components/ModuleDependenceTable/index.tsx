import { queryModule, queryModuleDependencies } from "@/api/module/module";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import columns, { methodDependency } from "./columns";
import { FormItemOption } from '@/types/form';
import ModuleDependenceArgsForm from './ModuleDependenceArgsForm'
import CollapsibleCard from '@/components/Business/CollapsibleCard';
import { Module } from "@/types/module";

function getRowKey(item: any) {
  const { caller, callee } = item;
  const randomKey = Math.random().toString(36).substr(2)
  return `${caller.fullName}-${callee.fullName}-${randomKey}`;
}

const getModulesOption = (modules?: Module[]): FormItemOption[] => {
  if (!modules) return []
  return modules.map(module => {
    return { label: module.name, value: module.name }
  })
}

interface ModuleDependenceProps {
  systemId: number
}

export default function ModuleDependence(props: ModuleDependenceProps) {
  const [tableData, setTableData] = useState<methodDependency[]>([]);
  const [modulesOption, setModulesOption] = useState([]);
  useEffect(() => {
    queryModule(props.systemId).then((res) => {
      let options = getModulesOption(res);
      setModulesOption(options as any)
    })
  }, [setModulesOption])

  const onBtnClick = (args: { moduleAName: string, moduleBName: string }) => {
    queryModuleDependencies({
      caller: args.moduleAName,
      callee: args.moduleBName
    }, props.systemId).then((res) => {
      setTableData(res);
    });
  }

  return (
    <CollapsibleCard title="模块间函数调用" collapsed={true}>
      <div key="module-function-invoke">
        <ModuleDependenceArgsForm
          options={modulesOption}
          onFinish={onBtnClick}></ModuleDependenceArgsForm>
        <Table tableLayout="fixed" columns={columns} dataSource={tableData} bordered rowKey={getRowKey} />
      </div>
    </CollapsibleCard>
  );
}
