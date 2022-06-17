import React from "react";
import SmartSuggest from "@/pages/insights/SmartSuggest";
import { Select } from "antd";

function Insights() {
  const { Option } = Select;

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <div>
      <div>Insights</div>
      <div>
        <Select
          showSearch
          placeholder="Select a System"
          optionFilterProp="children" ></Select>

        <Select
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
      </div>
      <div style={{ height: "22px" }}>
        <SmartSuggest />
      </div>
    </div>
  );
}

export default Insights;
