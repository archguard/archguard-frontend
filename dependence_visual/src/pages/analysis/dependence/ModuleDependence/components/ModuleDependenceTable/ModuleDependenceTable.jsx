import React, { useMemo, useState } from "react";
import { Table, Button } from "antd";
import CollapsibleCard from "@/components/CollapsibleCard";
import columns from "./columns";
import { buildFormItems } from "./config";
import ArgsArea from "@/components/ArgsArea";

import { queryModuleDependencies } from "@/api/module/module";
import useModules from "../../../states/useModules";

function filterData(data, dataIndex, value, matchType) {
  if (!value) return data;
  if (!matchType) matchType = "fuzz";

  if (matchType === "fuzz") {
    return data.filter((item) => {
      return item[dataIndex].indexOf(value) !== -1;
    });
  }
  if (matchType === "exact") {
    return data.filter((item) => {
      return item[dataIndex] === value;
    });
  }
}

function getRowKey(item) {
  const { callee, calleeClass, calleeMethod, caller, callerClass, callerMethod } = item;
  return `${caller}-${callerClass}-${callerMethod}-${callee}-${calleeClass}-${calleeMethod}`;
}

const defaultFormData = {
  matchType: "fuzz",
  dependenceType: "callerClass",
};

export default function ModuleDependence(props) {
  const [tableData, setTableData] = useState([]);
  const [{ value: modules }] = useModules();
  const buttons = useMemo(() => {
    return [
      {
        text: "查询",
        id: "show",
        span: 2,
        float: "right",
        type: "primary",
        onClick: (args, validate) => {
          console.log(args, validate);
          if (!validate.isValidate) return;
          queryModuleDependencies({
            caller: args.moduleAName,
            callee: args.moduleBName,
          }).then((res) => {
            setTableData(filterData(res, args.dependenceType, args.className, args.matchType));
          });
        },
      },
    ];
  }, [tableData, setTableData]);

  const formItems = useMemo(() => {
    return buildFormItems(modules);
  }, [modules]);

  return (
    <CollapsibleCard title="模块间函数调用">
      <div key="module-function-invoke">
        <ArgsArea formItems={formItems} buttons={buttons} defaultFormData={defaultFormData} />
        <Table columns={columns} dataSource={tableData} bordered rowKey={getRowKey} />
      </div>
    </CollapsibleCard>
  );
}
