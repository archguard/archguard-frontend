import { BaCard } from "@/components/Basic/Card/Card";
import {
  ChartItem,
  INDICATOR_LEVEL_COLOR,
} from "@/pages/system/systemEvolving/MeasureIndicators/Components/ChartCard";
import { Button, Form, Input } from "antd";
import { JsonView } from "@/pages/interactiveAnalysis/block/components/JsonView";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

interface QueryChartProps {
  card: any;
  index: number;
  createInsight: (values: any) => void;
}

function InsightQueryChart(props: QueryChartProps) {
  const graphData = [
    {
      date: new Date().toDateString(),
      value: props.card.length,
    },
  ];

  return (
    <div key={"insight" + props.index} className="insight-result">
      <BaCard className="insight-chart">
        <ChartItem color={INDICATOR_LEVEL_COLOR.pass} graphData={graphData} />
      </BaCard>

      <Form
        className="insight-form"
        name="create_insight"
        wrapperCol={{ span: 14 }}
        labelCol={{ span: 6 }}
        onFinish={props.createInsight}
        layout="inline"
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              pattern: /^[a-zA-Z\d]+$/,
              message: "alphanumeric only",
            },
          ]}
        >
          <Input style={{ width: "200px" }} placeholder="Name" />
        </Form.Item>

        <Form.Item>
          <Button icon={<PlusOutlined />} type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
      <JsonView data={props.card} />
    </div>
  );
}

export default InsightQueryChart;
