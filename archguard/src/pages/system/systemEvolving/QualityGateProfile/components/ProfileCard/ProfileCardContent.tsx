import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import {
  getQuotaListByLayer,


} from "@/pages/system/metric/ModuleCouplingTree/Report";
import { Form, Space, Button, Select, Input, Cascader } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import { Store } from "antd/lib/form/interface";
import { LayerKeys, ProfileConfig, Quota } from "@/types/metrics";

const genOptions = (keys: string[]) =>
  keys.map((key) => {
    return { label: key, value: key };
  });
const genCascaderOptions = (quota: Quota) => {
  const layerKeys = Object.keys(quota) as LayerKeys[];
  return layerKeys.map((key) => {
    return {
      value: key,
      label: key,
      children: genOptions(quota[key]),
    };
  });
};
const operatorOptions = genOptions(["BIGGER", "LESS", "EQUAL"]);

interface PropfileCardContentProps {
  editing: boolean;
  data?: ProfileConfig[];
  onFinish(values: Store): void;
}

const buildFormData = (data?: ProfileConfig[]) => {
  if (!data) return [];
  return data.map((config) => {
    return { ...config, layerQuota: [config.layer, config.quota] };
  });
};

const ProfileCardContent = (props: PropfileCardContentProps, ref: any) => {
  const { onFinish } = props;
  const [form] = useForm();
  const [data, setData] = useState(props.data || []);
  const initialValues = { profileConfig: buildFormData(data) };
  const quotaList = getQuotaListByLayer();
  const cascaderOptions = genCascaderOptions(quotaList);

  useImperativeHandle(ref, () => ({
    submit: () => form.submit(),
  }));

  useEffect(() => {
    setData(props.data!);
  }, [props.data]);

  const renderProfileList = () => {
    return (
      <div className="profile-readonly">
        <div className="profile-header">
          <div>Layer</div>
          <div>Quota</div>
          <div>Operator</div>
          <div>Value</div>
        </div>
        {data.length ? (
          data.map((profile, index) => (
            <div className="profile-container" key={`profile_${index}`}>
              <div>{profile.layer}</div>
              <div>{profile.quota}</div>
              <div>{profile.operator}</div>
              <div>{profile.value}</div>
            </div>
          ))
        ) : (
          <div className="empty-text">暂无数据</div>
        )}
      </div>
    );
  };

  return !props.editing ? (
    renderProfileList()
  ) : (
    <Form autoComplete="off" form={form} initialValues={initialValues} onFinish={onFinish}>
      <Form.List name="profileConfig">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field: any) => (
                <Space key={field.key}>
                  <Form.Item
                    {...field}
                    name={[field.name, "layerQuota"]}
                    fieldKey={[field.fieldKey, "layerQuota"]}
                  >
                    <Cascader
                      style={{ minWidth: "160px" }}
                      options={cascaderOptions}
                      placeholder="layer / quota"
                      allowClear={false}
                    ></Cascader>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "operator"]}
                    fieldKey={[field.fieldKey, "operator"]}
                  >
                    <Select style={{ minWidth: "120px" }} placeholder="operator">
                      {operatorOptions.map((operator) => {
                        return (
                          <Select.Option value={operator.value} key={operator.value}>
                            {operator.label}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "value"]}
                    fieldKey={[field.fieldKey, "value"]}
                    rules={[{ required: true, message: "请输入值" }]}
                  >
                    <Input
                      style={{ minWidth: "80px" }}
                      type="number"
                      step="0.01"
                      placeholder="value"
                    ></Input>
                  </Form.Item>
                  <Form.Item>
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: "0 8px" }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Form.Item>
                </Space>
              ))}
              <Form.Item>
                <Button
                  block
                  type="dashed"
                  onClick={() => {
                    add({
                      layerQuota: ["MODULE", "OIA"],
                      operator: "BIGGER",
                      value: 0,
                    });
                  }}
                >
                  <PlusOutlined /> 新增
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Form>
  );
};

export default forwardRef(ProfileCardContent);
