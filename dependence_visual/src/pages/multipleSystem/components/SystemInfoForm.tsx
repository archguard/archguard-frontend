import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Store } from "antd/lib/form/interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { SystemInfo } from "@/api/addition/systemInfo";
import useSystemList from "@/store/global-cache-state/useSystemList";

interface SystemInfoFormProps {
  data?: SystemInfo;
  onSubmit(systemInfo: SystemInfo): void;
}
const SystemInfoForm = (props: SystemInfoFormProps, ref: any) => {
  const { data, onSubmit } = props;
  const [form] = useForm();
  const [systemList] = useSystemList();
  const systemNames = systemList?.value!.map((item) => item.systemName);

  useEffect(() => {
    form.setFieldsValue(data as Store);
  }, [data]);

  useImperativeHandle(ref, () => ({
    submit: () => form.submit(),
    clear: () => form.resetFields(["systemName", "repoType", "username", "password", "repo"]),
  }));

  const onFinish = (values: Store) => {
    onSubmit(Object.assign({ ...data, ...values }));
  };

  const isValidUrl = (value: string) => {
    return true;
  };

  const isDuplicateSystemName = (systemName: string) => {
    const valueChanged = form.getFieldValue("systemName") !== data?.systemName;
    const isIncluded = systemNames?.includes(systemName);
    return valueChanged && isIncluded;
  };

  return (
    <div className="system-info-form">
      <h2>{data ? "编辑系统信息" : "创建新系统"}</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ repoType: "GIT", repo: [""] }}
      >
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
        >
          <Input placeholder="请输入系统名称" />
        </Form.Item>
        <Form.Item
          name="repoType"
          label="仓库类型"
          rules={[{ required: true, message: "请选择仓库类型！" }]}
          required
        >
          <Select>
            {["GIT", "SVN"].map((value) => (
              <Select.Option value={value} key={value}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="username" label="仓库用户名">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password" label="仓库密码">
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.List name="repo">
          {(fields, { add, remove }) => {
            return (
              <div>
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
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    <PlusOutlined /> 添加仓库地址
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
};
export default forwardRef(SystemInfoForm);
