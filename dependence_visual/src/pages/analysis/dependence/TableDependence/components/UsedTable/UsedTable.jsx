import React from "react";

import { Table } from "antd";

import { columns, expandedRowRender } from "./config";

import { transformByTable } from './transform'



export default function TableDependence(props) {
  const dataSource = transformByTable(props.data)

  return (
    <div>
      <h2>used table</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="table"
        expandable={{ expandedRowRender }}
      />
    </div>
  );
}
