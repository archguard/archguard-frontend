import React from "react";
import {List} from 'antd'

export default function UnusedTable(props) {
  return (
    <div>
      <h2>unused table</h2>
      <List
        bordered
        dataSource={props.data}
        renderItem={(item) => <List.Item>{item.table}</List.Item>}
      />
    </div>
  );
}
