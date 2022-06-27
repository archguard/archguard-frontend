import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Select, Space} from "antd";
import useSystemList from "@/store/global-cache-state/useSystemList";
import SmartSuggest from "@/pages/insights/searchbar/SmartSuggest";
import "./Insights.less";
import { customInsight, deleteInsightByName, getByName, listInsights, snapshotInsight } from "@/api/insights/Insight";
import {
  ChartItem,
  INDICATOR_LEVEL_COLOR
} from "@/pages/system/systemEvolving/MeasureIndicators/Components/ChartCard";
import { BaCard } from "@/components/Basic/Card/Card";
import { groupBy } from "lodash";
import InsightQueryChart from "@/pages/insights/InsightQueryChart";

let defaultSearchText = "field:dep_name == /.*dubbo/ field:dep_version > 1.12.3";

function Insights() {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [systemInfo] = useSystemList();
  const [systemId, setSystemId] = useState(-1);
  const [searchText, setSearchText] = useState(defaultSearchText);
  const [cards, setCards] = useState([]);
  const [histories, setHistories] = useState({ });

  const onFinish = useCallback((values: any) => {
    snapshotInsight({ systemId: systemId, expression: searchText, type: values['insightType'] }).then((data) => {
      setCards((prevCards) => [...prevCards, data]);
    });
  }, [searchText, systemId, setCards]);

  const changeType = useCallback((type: any) => {
    let text = defaultSearchText;
    switch (type) {
      case "api":
        text = "";
        break;
      case "case":
        break;
      default:
        text = defaultSearchText;
    }

    setSearchText(text);
  }, [setSearchText]);

  const onSystemChange = useCallback(
    (value) => {
      switch (value) {
        case "all":
          setSystemId(null);
          break;
        default:
          setSystemId(value);
          break;
      }
    },
    [setSystemId],
  );

  const changeSearchInput = useCallback(
    (text: string) => {
      setSearchText(text);
    },
    [setSearchText],
  );

  const refreshInsights = useCallback(() => {
    listInsights().then((data) => {
      setHistories(groupBy(data, "name"));
    });
  }, [setHistories])

  const createInsight = useCallback((values: any) => {
    customInsight({
      systemId: systemId, expression: searchText, name: values.name
    }).then(r => {
      refreshInsights();
    })
  }, [systemId, searchText, refreshInsights])

  useEffect(() => {
    refreshInsights();
  }, [refreshInsights]);

  const deleteInsight = useCallback(
    (key: string) => {
      deleteInsightByName(key).then((r) => {
        refreshInsights();
      });
    },
    [refreshInsights],
  );

  const updateInsight = useCallback(
    (key: string) => {
      getByName(key).then((data) => {
        customInsight({
          systemId: data.systemId,
          expression: data.expression,
          name: data.name,
        }).then((r) => {
          refreshInsights();
        });
      });
    },
    [refreshInsights],
  );

  return (
    <div>
      <div className="search-form">
        <Form form={form} name="insight_form" onFinish={onFinish} layout="inline">
          <Form.Item name="insightSystem">
            <Select
              showSearch
              placeholder="Select a System"
              onChange={(value) => onSystemChange(value)}
              style={{ width: "200px"}}
            >
              <Select.Option value={"all"} key={`all`}>
                All
              </Select.Option>
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
          </Form.Item>
          <Form.Item name="insightType">
            <Select placeholder="Select a type" showSearch onChange={changeType} style={{ width: "200px"}}>
              <Option value="sca">Package Dependencies (Gradle/NPM)</Option>
              <Option value="api">API</Option>
            </Select>
          </Form.Item>

          <div style={{ height: "32px", width: "800px" }}>
            <SmartSuggest onChange={changeSearchInput} code={searchText}/>
          </div>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Query
            </Button>
          </Form.Item>
        </Form>

      </div>

      <h2>Subscribed Insight</h2>
      <div className="history-container">
        {Object.keys(histories).map((key, i) => {
          return (
            <div key={"insight-history" + i} className="insight-history-result">
              <BaCard className="insight-chart">
                <div>{key}</div>
                <ChartItem color={INDICATOR_LEVEL_COLOR.pass} graphData={histories[key]} />
              </BaCard>
              <div className="insight-operation">
                <Space align={"center"}>
                  <Button type="primary" onClick={() => updateInsight(key)}>
                    Update
                  </Button>
                  <Button danger onClick={() => deleteInsight(key)}>
                    Delete
                  </Button>
                </Space>
              </div>
            </div>
          );
        })}
      </div>

      <h2>Temporary Insight</h2>
      <div className="result-container">
        {cards?.map((card, i) => (
          <InsightQueryChart key={i} card={card} index={i} createInsight={createInsight} />
        ))}
      </div>
    </div>
  );
}

export default Insights;
