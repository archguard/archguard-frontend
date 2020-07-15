import React from "react";
import { Table } from "antd";

export const columns = [
  {
    title: "table",
    dataIndex: "table",
  },
  {
    title: "classes",
    dataIndex: "classes",
    render: (classes) => classes.length,
    sorter: (a, b) => a.classes.length - b.classes.length,
  },
  {
    title: "num",
    dataIndex: "num",
    sorter: (a, b) => a.num - b.num,
    defaultSortOrder: "descend",
  },
];

const expandedColumns = [
  {
    title: "class",
    dataIndex: "class",
  },
  {
    title: "num",
    dataIndex: "num",
    sorter: (a, b) => a.num - b.num,
  },
];

export function expandedRowRender(record) {
  return (
    <div style={{padding: "32px"}}>
      <Table
        bordered
        columns={expandedColumns}
        dataSource={record.classes}
        pagination={record.classes.length > 10}
      />
    </div>
  );
}
