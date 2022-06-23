import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import useSystemList from "@/store/global-cache-state/useSystemList";
import SmartSuggest from "@/pages/insights/searchbar/SmartSuggest";
import "./Insights.less";
import { customInsight, listInsights, scaInsight } from "@/api/insights/scaInsight";
import {
  badSmellWording,
  ChartItem,
  INDICATOR_LEVEL_COLOR
} from "@/pages/system/systemEvolving/MeasureIndicators/Components/ChartCard";
import { JsonView } from "@/pages/interactiveAnalysis/block/components/JsonView";
import { BaCard } from "@/components/Basic/Card/Card";
import { groupBy } from "lodash";
import { BaTipsIcon } from "@/components/Basic/TipsIcon/TipsIcon";

function Insights() {
  const { Option } = Select;
  const [systemInfo] = useSystemList();
  const [systemId, setSystemId] = useState(-1);
  const [result, setResult] = useState(null as any);
  const [searchText, setSearchText] = useState("");
  const [cards, setCards] = useState([]);
  const [histories, setHistories] = useState({ });

  const onChange = (value: string) => {};

  const onFinish = useCallback(() => {
    scaInsight({ systemId: systemId, expression: searchText }).then((data) => {
      setResult(data);
      setCards((prevCards) => [...prevCards, data]);
    });
  }, [searchText, systemId, setCards]);

  const onSystemChange = useCallback(
    (value) => {
      setSystemId(value);
    },
    [setSystemId],
  );

  const changeSearchInput = useCallback(
    (text: string) => {
      setSearchText(text);
    },
    [setSearchText],
  );

  const createInsight = useCallback((values: any) => {
    customInsight({
      systemId: systemId, expression: searchText, name: values.name
    }).then(r => {
      console.log(r)
    })
  }, [systemId, searchText])

  useEffect(() => {
    listInsights().then((data) => {
      setHistories(groupBy(data, "name"))
    });
  }, [setHistories])

  function createResult(card, i: number) {
    const graphData = [
      {
        date: new Date().toDateString(),
        value: card.length,
      },
    ];
    return (
      <div key={"insight" + i} className="insight-result">
        <BaCard className="insight-chart">
          <ChartItem color={INDICATOR_LEVEL_COLOR.pass} graphData={graphData} />
        </BaCard>

        <Form
          className="insight-form"
          name="create_insight"
          wrapperCol={{ span: 14 }}
          labelCol={{ span: 6 }}
          onFinish={createInsight}
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
        <JsonView data={card} />
      </div>
    );
  }

  return (
    <div>
      <div className="search-form">
        <Form
          name="validate_other"
          wrapperCol={{ span: 14 }}
          labelCol={{ span: 6 }}
          onFinish={onFinish}
          layout="inline"
        >
          <Select
            showSearch
            placeholder="Select a System"
            defaultActiveFirstOption={true}
            onChange={(value) => onSystemChange(value)}
          >
            {systemInfo?.value!.map((system, index) => (
              <Select.Option
                disabled={system.scanned !== "SCANNED"}
                value={system.id}
                key={`${system.systemName}_${index}`}
              >
                {system.systemName}
              </Select.Option>
            ))}
          </Select>

          <Select
            name="type"
            showSearch
            placeholder="Select a type"
            defaultActiveFirstOption={true}
            onChange={onChange}
          >
            <Option value="sca">Package Dependencies (Gradle/NPM)</Option>
            <Option value="sourcecode">Source Code</Option>
            <Option value="api">API</Option>
          </Select>

          <div style={{ height: "32px", width: "800px" }}>
            <SmartSuggest onChange={changeSearchInput} />
          </div>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Query
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="history-container">
        {Object.keys(histories).map((key, i) => {
          return <div key={"insight-history" + i} className="insight-result">
            <BaCard className="insight-chart">
              <div>{key}</div>
              <ChartItem color={INDICATOR_LEVEL_COLOR.pass} graphData={histories[key]} />
            </BaCard>
          </div>;
        })}
      </div>

      <div className="result-container">
        {cards?.map((card, i) => {
          return createResult(card, i);
        })}
      </div>
    </div>
  );
}

export default Insights;
