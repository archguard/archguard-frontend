import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { Form, Input, Select, Button, Steps, message, Radio, Collapse } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Store } from "antd/lib/form/interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { SystemInfo } from "@/api/addition/systemInfo";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { useState } from 'react';
import AllBadSmellThreshold from '@/pages/systemEvolving/BadSmellThreshold/AllBadSmellThreshold';
import BadSmellThreshold from '@/pages/systemEvolving/BadSmellThreshold/BadSmellThreshold';
import { AllBadSmellOption, useAllBadSmellOption } from '@/api/module/allBadSmellThresholds';
import BadSmellThresholdTable from '@/pages/systemEvolving/BadSmellThreshold/components/BadSmellThresholdTable';

interface SystemInfoFormProps {
  data?: SystemInfo;
  onSubmit(systemInfo: SystemInfo): void;
}
const SystemInfoForm = (props: SystemInfoFormProps, ref: any) => {
  const { data, onSubmit } = props;
  const [form] = useForm();
  const [systemList] = useSystemList();
  const systemNames = systemList?.value!.map((item) => item.systemName);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    form.setFieldsValue(data as Store);
  }, [data]);

  useImperativeHandle(ref, () => ({
    submit: () => form.submit(),
    clear: () => form.resetFields(["systemName", "repoType", "username", "password", "repo", "branch"]),
  }));

  const onFinish = (values: Store) => {
    const passwordChanged = data?.password !== values.password;
    const submitData = Object.assign({ ...data, ...values });

    if (!passwordChanged) {
      delete submitData.password;
    }

    onSubmit(submitData);
  };

  const isValidUrl = (value: string) => {
    return true;
  };

  const isDuplicateSystemName = (systemName: string) => {
    const valueChanged = form.getFieldValue("systemName") !== data?.systemName;
    const isIncluded = systemNames?.includes(systemName);
    return valueChanged && isIncluded;
  };

  const nextButton = () => {
    setCurrent(current + 1);
  };

  const prevButton = () => {
    setCurrent(current - 1);
  };

  const { Step } = Steps;

  const systemInfoPage = (
    <div className="system-info-form">
      <h2>{data ? "编辑系统信息" : "创建新系统"}</h2>
      <Form.Item
        name="systemName"
        label="系统名称"
        rules={[
          {
            required: true,
            validator: (_, value) => {
              if (!value) return Promise.reject("请输入系统名称！");
              return isDuplicateSystemName(value)
                ? Promise.reject("系统名称不能重复！")
                : Promise.resolve();
            },
          },
        ]}
        required
        style={{ display: current === 0 ? 'initial' : 'none' }}
      >
        <Input placeholder="请输入系统名称" />
      </Form.Item>
      <Form.Item
        name="repoType"
        label="仓库类型"
        rules={[{ required: true, message: "请选择仓库类型！" }]}
        required
        style={{ display: current === 0 ? 'initial' : 'none' }}
      >
        <Select>
          {["GIT", "SVN"].map((value) => (
            <Select.Option value={value} key={value}>
              {value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.List name="repo">
        {(fields, { add, remove }) => {
          return (
            <div style={{ display: current === 0 ? 'initial' : 'none' }}>
              <div style={{ paddingBottom: 8 }}>
                <span
                  style={{
                    marginRight: 4,
                    color: "#ff4d4f",
                    fontSize: 14,
                    fontFamily: "SimSun, sans-serif",
                  }}
                >
                  *
                  </span>
                <span>仓库地址</span>
              </div>
              {fields.map((field) => (
                <div style={{ display: "flex" }} key={field.key}>
                  <Form.Item
                    {...field}
                    rules={[
                      {
                        required: true,
                        validator: (_, value) => {
                          if (!value) return Promise.reject("请输入仓库地址！");
                          return isValidUrl(value)
                            ? Promise.resolve()
                            : Promise.reject("请输入正确的仓库地址！");
                        },
                      },
                    ]}
                    style={{ width: "100%" }}
                    required
                  >
                    <Input style={{ width: "100%" }} placeholder="请输入仓库地址" />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{ margin: "0 8px", lineHeight: "32px" }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          );
        }}
      </Form.List>
      <Form.Item
        name="branch"
        label="分支名称"
        rules={[
          {
            required: true,
          },
        ]}
        required
        style={{ display: current === 0 ? 'initial' : 'none' }}
      >
        <Input placeholder="master" />
      </Form.Item>
      <Form.Item name="username" label="仓库用户名" style={{ display: current === 0 ? 'initial' : 'none' }}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="password" label="仓库密码" style={{ display: current === 0 ? 'initial' : 'none' }}>
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      {/* <Form.Item name="badSmellThresholdSuiteId" label="Radio.Group" style={{ display: current === 0 ? 'none' : 'initial' }}>
          <Radio.Group>
            <Radio value="a">item 1</Radio>
            <Radio value="b">item 2</Radio>
            <Radio value="c">item 3</Radio>
          </Radio.Group>
        </Form.Item> */}
    </div>
  );

  const steps = [
    {
      title: 'First',
      content: systemInfoPage,
    },
  ];

  return (
    <>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ repoType: "GIT", repo: [""], branch: "master" }}
      >
        <div className="steps-content">{steps[current].content}</div>
        <Form.Item>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => nextButton()}>
              下一页
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prevButton()}>
              上一页
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};
export default forwardRef(SystemInfoForm);
