import React, { useState, useEffect } from "react";
import { ConfigData } from "./ConfigForm/config";
import { Form, Space, Button, Select, Card } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { queryPluginTypes } from "@/api/module/plugin";
import { useMount } from "react-use";

interface SelectOption {
  label: string;
  value: string;
}

function PluginConfig(props: { data: ConfigData; updateData: Function }) {
  const type = "plugin";
  const [form] = Form.useForm();

  const { data, updateData } = props;
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  useMount(() => {
    queryPluginTypes().then((res) => {
      const selectOption = res.map((item) => ({ label: item, value: item }));
      setOptions(selectOption);
    });
  });

  const onFinish = (values: ConfigData) => {
    values[type] = values[type].map((item, index) => ({
      ...item,
      type,
      key: "name",
      order: index,
    }));
    updateData(values);
  };

  return (
    <Card title="插件配置">
      <Form form={form} onFinish={onFinish}>
        <Form.List name={type}>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field: any) => {
                  return (
                      <Space key={field.key} style={{ display: 'flex'}} align="baseline">
                        <Form.Item
                          {...field}
                          name={[field.name, "value"]}
                          fieldKey={[field.fieldKey, "value"]}
                          rules={[{ required: true, message: "插件选择不可为空" }]}
                        >
                          <Select placeholder="插件" options={options} style={{ width: 180 }} />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Space>
                  );
                })}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined />
                    新增
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default PluginConfig;
