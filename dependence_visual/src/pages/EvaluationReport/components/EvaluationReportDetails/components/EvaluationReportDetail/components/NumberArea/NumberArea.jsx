import React from "react";
import { Row, Col, Card, Statistic } from "antd";

export default function NumberArea(props) {
  const data = props.data;
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
