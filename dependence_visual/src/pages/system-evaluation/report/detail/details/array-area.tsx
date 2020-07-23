import { Empty, Table } from "antd";
import React from "react";

type RowType = string | {};
export default function ArrayArea({ data }: { data: Array<any> }) {
  return <div>{renderTable(data)}</div>;
}

function renderTable(array: Array<any>) {
  if (array.length === 0) return <Empty />;

  if (typeof array[0] === "string") {
    array = array.map((item) => ({ item }));
  }

  const columns = Object.keys(array[0]).map((key) => ({
    title: key,
    dataIndex: key,
    render: (text: string) => (Array.isArray(text) ? text.length : text),
  }));

  const dataSource = array.map((item, index) => ({
    ...item,
    key: item.key || item.id || item.type || item.name || index,
  }));

  dataSource.forEach((item) => {
    for (let key in item) {
      const subItem = item[key];
      if (Array.isArray(subItem) && subItem.length > 0) {
        item.expandedData = subItem;
      }
    }
  });

  return (
    <div style={{ margin: "16px 0" }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: true }}
        bordered={true}
        pagination={dataSource.length > 10 ? undefined : false}
        expandable={{
          expandedRowRender: (record) => renderTable(record.expandedData),
          rowExpandable: (record) => record.expandedData,
        }}
      />
    </div>
  );
}
