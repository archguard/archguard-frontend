import React from "react";
import { Table, Card, Descriptions } from "antd";
import { columns, commitLabelMap } from "./config";

export default function ScatterCommitsDetail(props) {
    return (
      <div>
        {props.data.map(item => {
          return (
            <Card key={item.id} style={{ margin: "16px 0" }}>
              <Descriptions>
                <Descriptions.Item label={commitLabelMap["id"]}>{item.id}</Descriptions.Item>
                <Descriptions.Item label={commitLabelMap["commitTime"]}>
                  {item.commitTime}
                </Descriptions.Item>
                <Descriptions.Item label={commitLabelMap["committer"]}>
                  {item.committer}
                </Descriptions.Item>
                <Descriptions.Item label={commitLabelMap["shortMessage"]}>
                  {item.shortMessage}
                </Descriptions.Item>
              </Descriptions>
              <Table columns={columns} dataSource={item.entrySet}></Table>
            </Card>
          );
        })}
      </div>
    );
}
