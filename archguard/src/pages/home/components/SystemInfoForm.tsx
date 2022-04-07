import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { Form, Input, Select, Button, Steps, message, Radio, Collapse } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Store } from "antd/lib/form/interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { SystemInfo } from "@/api/addition/systemInfo";
import useSystemList from "@/store/global-cache-state/useSystemList";
import "./SystemInfoForm.less";
import BadSmellThresholdForm from '@/pages/system/systemEvolving/BadSmellThreshold/components/BadSmellThresholdForm';

interface SystemInfoFormProps {
  data?: SystemInfo;
  onSubmit(systemInfo: SystemInfo): void;
  current: number;
  currentAction: string;
}
const SystemInfoForm = (props: SystemInfoFormProps, ref: any) => {
  const { data, onSubmit, current, currentAction } = props;
  const [form] = useForm();
  const [systemList] = useSystemList();
  const systemNames = systemList?.value!.map((item) => item.systemName);
  const { Step } = Steps;

  useEffect(() => {
    form.setFieldsValue(data as Store);
  }, [data]);

  useImperativeHandle(ref, () => ({
    submit: () => form.submit(),
    clear: () => form.resetFields(["systemName", "repoType", "username", "password", "repo", "branch", "codePath", "language"]),
    validateFields: () => form.getFieldsError(),
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


  const systemInfoPage = (
    <div>
      <h2>{data ? "编辑系统信息" : "创建新系统"}</h2>
      <Form.Item
        name="systemName"
        label="系统名称"
        validateTrigger={['onChange', 'onBlur']}
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
        validateTrigger={['onChange', 'onBlur']}
        rules={[{ required: true, message: "请选择仓库类型！" }]}
        required
        style={{ display: current === 0 ? 'initial' : 'none' }}
      >
        <Select>
          {["GIT", "SVN", "LOCAL"].map((value) => (
            <Select.Option value={value} key={value}>
              { value === "LOCAL" ? "LOCAL（仅限于本地开发时）" : value }
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="language"
        label="编程语言"
        validateTrigger={['onChange', 'onBlur']}
        rules={[{ required: true, message: "请选择编程语言！" }]}
        required
        style={{ display: current === 0 ? 'initial' : 'none' }}
      >
        <Select>
          { ["Java", "Kotlin", "TypeScript", "Golang", "Python", "C#", "JavaScript", "Jvm"].map((value) => (
            <Select.Option value={ value } key={ value }>
              { value === "Jvm" ? "JVM（不推荐）" : value }
            </Select.Option>
          )) }
        </Select>
      </Form.Item>
      <Form.List name="repo">
        {(fields, { add, remove }) => {
          return (
            <div style={{ display: current === 0 ? 'initial' : 'none' }}>
              <div>
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
                <span>仓库地址（如：https://github.com/archguard/archguard）</span>
              </div>
              {fields.map((field) => (
                <div style={{ display: "flex" }} key={field.key}>
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
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
        validateTrigger={['onChange', 'onBlur']}
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
      <Form.Item
        name="codePath"
        label="源码目录"
        validateTrigger={['onChange', 'onBlur']}
        style={{ display: current === 0 ? 'initial' : 'none' }}
      >
        <Input placeholder="适用于无包概念的语言，如 TypeScript" />
      </Form.Item>
      <Form.Item name="username" label="仓库用户名" style={{ display: current === 0 ? 'initial' : 'none' }}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="password" label="仓库密码" style={{ display: current === 0 ? 'initial' : 'none' }}>
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item name="badSmellThresholdSuiteId" label="请选择合适您系统的指标阈值：" style={{ display: current === 0 ? 'none' : 'initial' }}>
        <Radio.Group style={{ width: '100%' }}>
          <BadSmellThresholdForm currentAction={currentAction}></BadSmellThresholdForm>
        </Radio.Group>
      </Form.Item>
    </div>
  );

  const steps = [
    {
      title: '基础信息',
      content: systemInfoPage,
    },
    {
      title: '指标阈值',
      content: systemInfoPage,
    },
  ];

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ repoType: "GIT", language: "Jvm", repo: [""], branch: "master", badSmellThresholdSuiteId: 1 }}
        scrollToFirstError
      >
        <Steps current={current} style={{ padding: '10px 0' }}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="StepsContent">{steps[current].content}</div>
      </Form>
    </>
  );
};
export default forwardRef(SystemInfoForm);
