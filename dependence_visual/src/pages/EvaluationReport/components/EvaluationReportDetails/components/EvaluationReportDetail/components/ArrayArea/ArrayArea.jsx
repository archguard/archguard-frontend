import React from "react";
import { Empty, Table } from "antd";

export default function ArrayArea(props) {
  return <div>{renderTable(props.data)}</div>;
}

function renderTable(array) {
  if (array.length === 0) return <Empty />;

  if (typeof array[0] === "string") {
    array = array.map((item) => ({ item }));
  }

  const columns = Object.keys(array[0]).map((key) => ({
    title: key,
    dataIndex: key,
    render: (text) => (Array.isArray(text) ? text.length : text),
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
        pagination={dataSource.length > 10}
        expandable={{
          expandedRowRender: (record) => renderTable(record.expandedData),
          rowExpandable: (record) => record.expandedData,
        }}
      />
    </div>
  );
}
