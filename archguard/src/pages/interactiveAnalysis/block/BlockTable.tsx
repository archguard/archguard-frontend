import { useEffect, useState } from "react";
import { Table } from "antd";

export function BlockTable(props: { data: any[] }) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    let keys = Object.keys(props.data[0]);
    let cols = [];
    keys.forEach((key) => {
      cols.push({
        title: key,
        dataIndex: key,
        key: key,
      });
    });

    setColumns(cols)
  }, [props.data, setColumns]);

  return <Table dataSource={props.data} columns={columns} />;
}
