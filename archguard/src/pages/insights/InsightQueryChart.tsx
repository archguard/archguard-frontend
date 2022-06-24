import { BaCard } from "@/components/Basic/Card/Card";
import { ChartItem, INDICATOR_LEVEL_COLOR } from "@/pages/system/systemEvolving/MeasureIndicators/Components/ChartCard";
import { Button, Form, Input } from "antd";
import { JsonView } from "@/pages/interactiveAnalysis/block/components/JsonView";
import React from "react";

interface QueryChartProps {
  card: any,
  index: number,
  createInsight: (values: any) => void,
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
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
      <JsonView data={props.card} />
    </div>
  );
}

export default InsightQueryChart;
