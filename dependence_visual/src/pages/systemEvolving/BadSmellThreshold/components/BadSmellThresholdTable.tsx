import { Table } from "antd";
import React from "react";
import styles from "./BadSmellThresholdTable.less";
import {
  BadSmellThresholdTableColumns,
  BadSmellThresholdTableData,
} from "./BadSmellThresholdTable.config";

interface BadSmellThresholdTableProps {
  children?: React.ReactNode;
}

const BadSmellThresholdTable = (props: BadSmellThresholdTableProps) => {
  return (
    <Table
      columns={BadSmellThresholdTableColumns}
      dataSource={BadSmellThresholdTableData}
      pagination={false}
    />
  );
};

BadSmellThresholdTable.defaultProps = {};

export default BadSmellThresholdTable;
