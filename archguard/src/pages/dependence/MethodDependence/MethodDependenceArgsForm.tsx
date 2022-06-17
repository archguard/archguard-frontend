import React, { useEffect, useState } from "react";
import { Form, Row, Col, Select, Button, Input, Cascader } from "antd";
import { FormItemOption } from "@/types/form";
import useCodeTree from "@/store/global-cache-state/useCodeTree";
import { SelectValue } from "antd/lib/select";
import {
  transformCodeTreeToModuleOptions,
  transformCodeTreeToCascaderOptions,
} from "@/utils/utils";
import { queryMethodBy } from "@/api/module/methods";
import { JMethod } from "@/types/java";

const dependenceTypeOptions: FormItemOption[] = [
  {
    label: "全部依赖",
    value: "invokes",
  },
  {
    label: "调用依赖",
    value: "callees",
  },
  {
    label: "被调用依赖",
    value: "callers",
  },
];

interface MethodDependenceArgsFormProps {
  onFinish(values: {
    module?: string;
    className?: string[];
    methodName?: string;
    dependenceType?: string;
    deep?: number;
  }): void;
  defaultFormData: any;
  systemId: number;
}

const buildMethodOptions = (methods: JMethod[]) => {
  const methodSet = new Set(methods.map((m) => m.name));
  return [...methodSet].map((value) => {
    return { value, label: value };
  });
};

const MethodDependenceArgsForm = (props: MethodDependenceArgsFormProps) => {
  const { onFinish, defaultFormData } = props;
  const [form] = Form.useForm();
  const [codeTree] = useCodeTree(props.systemId);
  const [currentModule, setCurrentModule] = useState<SelectValue>();
  const [methodOptions, setMethodOptions] = useState<FormItemOption[]>([]);
  const moduleOptions = transformCodeTreeToModuleOptions(codeTree?.value!);
  const classCascaderOptions = transformCodeTreeToCascaderOptions(codeTree?.value!, true);

  const getMethodOptions = (module: string, className: string[]) => {
    if (className && className.length > 0 && className[0] === "") {
      className.shift()
    }

    if (module && className) {
      queryMethodBy(module, className!.join(".")).then((res) => {
        setMethodOptions(buildMethodOptions(res));
      });
    }
  };

  const onCascaderChange = (values: string[]) => {
    form.setFieldsValue({ methodName: "" });
    getMethodOptions(currentModule as string, values);
  };

  useEffect(() => {
    setCurrentModule(defaultFormData.module);
    form.setFieldsValue(defaultFormData);
    getMethodOptions(defaultFormData.module, defaultFormData.className);
  }, [defaultFormData]);

  return (
    <Form form={form} onFinish={onFinish} initialValues={{ deep: 3 }}>
      <Row gutter={24} key="dependence-module">
        <Col span={4}>
          <Form.Item name="module" rules={[{ required: true, message: "请选择模块！" }]}>
            <Select
              placeholder="模块"
              style={{ width: "100%" }}
              showSearch
              onChange={(value) => setCurrentModule(value)}
            >
              {moduleOptions.map(({ value, label }) => {
                return (
                  <Select.Option value={value} key={value}>
                    {label}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} key="class-name">
          <Form.Item
            name="className"
            rules={[
              {
                required: true,
                message: "类名必填",
              },
            ]}
          >
            <Cascader
              displayRender={(label) => label.join(".")}
              options={classCascaderOptions[currentModule as string]}
              placeholder="类名"
              notFoundContent="请先选择模块！"
              onChange={(value: any) => onCascaderChange(value as string[])}
            />
          </Form.Item>
        </Col>
        <Col span={4} key="function-name">
          <Form.Item
            name="methodName"
            rules={[
              {
                required: true,
                message: "方法名必填",
              },
            ]}
          >
            <Select placeholder="方法" style={{ width: "100%" }} showSearch>
              {methodOptions.map(({ value, label }, index) => (
                <Select.Option value={value} key={"method_" + index}>
                  {label}
                </Select.Option>
              ))}
            </Select>
            {/* <Input placeholder="方法名"></Input> */}
          </Form.Item>
        </Col>
        <Col span={4} key="dependence-type">
          <Form.Item
            name="dependenceType"
            rules={[
              {
                required: true,
                message: "依赖方式必填",
              },
            ]}
          >
            <Select placeholder="依赖方式" style={{ width: "100%" }} showSearch>
              {dependenceTypeOptions.map((item) => {
                return (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={2} key="deep">
          <Form.Item
            name="deep"
            rules={[
              {
                required: false,
                message: "调用深度需大于1",
                min: 1,
                type: "number",
                transform: (value) => {
                  if (value) {
                    return Number(value);
                  }
                  return 1;
                },
              },
            ]}
          >
            <Input type="number" placeholder="调用深度"></Input>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default MethodDependenceArgsForm;
