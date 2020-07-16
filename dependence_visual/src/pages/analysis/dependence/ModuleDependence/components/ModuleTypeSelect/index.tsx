import React from "react";
import { map } from "lodash";
import { Form, Select } from "antd";
import useModuleType from "../../globalStates/useModuleType";
import { moduleTypes } from "../../config";
import "./index.less";

const { Option } = Select;
export default function ModuleTypeSelect() {
  const [moduleType, setModuleType] = useModuleType();
  return (
    <Form.Item className="module-type-select" label="模块类型">
      <Select value={moduleType} onChange={setModuleType}>
        {map(moduleTypes, (moduleItem) => {
          return (
            <Option value={moduleItem.value} key={moduleItem.value}>
              {moduleItem.label}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
}
