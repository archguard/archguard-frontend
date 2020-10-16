import { Table } from "antd";
import React from "react";
import { BadSmellTableData, BadSmellThresholdTableColumns } from "./BadSmellThresholdTable.config";
import { BadSmellThreshold } from "@/api/module/badSmellThresholds";
import { genID } from "@/utils/utils";

interface BadSmellThresholdTableProps {
  data: BadSmellThreshold[];
}

const buildFormData = (data: BadSmellThreshold[]): BadSmellTableData[] => {
  const tableData: BadSmellTableData[] = [];

  for (let i = 0; i < data.length; i += 1) {
    const thresholdGroup = data[i].threshold;

    thresholdGroup.forEach((threshold, index) => {
      tableData.push({
        key: genID(),
        dimension: data[i].name,
        badSmell: threshold.name,
        condition: threshold.condition,
        threshold: threshold.value,
        rowspan: index === 0 ? thresholdGroup.length : 0,
      });
    });
  }

  return tableData;
};

const BadSmellThresholdTable = (props: BadSmellThresholdTableProps) => {
  const dataSource = buildFormData(props.data);

  return (
    <Table columns={BadSmellThresholdTableColumns} dataSource={dataSource} pagination={false} />
  );
};

BadSmellThresholdTable.defaultProps = {};

export default BadSmellThresholdTable;
