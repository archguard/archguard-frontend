import React from "react";
import { Row, Col, Card, Statistic } from "antd";

type NumberItem = {
  type: string;
  data: string;
};
export default function NumberArea({ data }: { data: NumberItem[] }) {
  return (
    <Row gutter={16}>
      {data.map((item, index) => {
        return (
          <Col span={6} key={index}>
            <Card>
              <Statistic title={item.type} value={item.data} />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
