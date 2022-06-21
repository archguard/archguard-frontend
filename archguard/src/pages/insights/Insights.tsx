import React, { useCallback, useEffect } from "react";
import { Button, Form, Select } from "antd";
import useSystemList from "@/store/global-cache-state/useSystemList";
import SmartSuggest from "@/pages/insights/searchbar/SmartSuggest";
import "./Insights.less";
import { scaInsight } from "@/api/insights/scaInsight";

function Insights() {
  const { Option } = Select;
  const [systemInfo] = useSystemList();

  useEffect(() => {
    scaInsight().then((data) => {
      console.log(data);
    })
  })

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const onSystemChange = useCallback((index: number) => {
    let system = systemInfo?.value!.filter((item) => item.id === index)[0]
    console.log(system);
  }, []);

  return (
    <div>
      <div className="search-form">
        <Form
          name="validate_other"
          wrapperCol={{ span: 14 }}
          labelCol={{ span: 6 }}
          onFinish={onFinish}
          layout="inline"
          initialValues={{
            'input-number': 3,
            'checkbox-group': ['A', 'B'],
            rate: 3.5,
          }}
        >
          <Select
            showSearch
            placeholder="Select a System"
            onChange={ (index) => onSystemChange(index) }>

            { systemInfo?.value!.map((system, index) => (
              <Select.Option
                disabled={ system.scanned !== "SCANNED" }
                value={ system.id }
                key={ `${ system.systemName }_${ index }` }
              >
                { system.systemName }
              </Select.Option>
            )) }
          </Select>

          <Select
            name="type"
            showSearch
            placeholder="Select a type"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="sca">Package Dependencies (Gradle/NPM)</Option>
            <Option value="sourcecode">Source Code</Option>
            <Option value="api">api</Option>
          </Select>

          <div style={{ height: "32px", width: "800px"}}>
            <SmartSuggest />
          </div>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Insights;
