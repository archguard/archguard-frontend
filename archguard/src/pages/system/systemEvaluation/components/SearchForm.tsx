import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import React, { forwardRef, useEffect } from "react"

export interface SearchFields {
  module: string;
  packageName: string;
  className: string;
  name: string;
}

interface SearchFormProps {
  data?: SearchFields;
  onSubmit(searchFields: SearchFields): void;
}

const SearchForm = (props: SearchFormProps, ref: any) => {
  const { data, onSubmit } = props;
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(data as Store);
  }, [data]);

  const onFinish = (values: Store) => {
    const submitData = Object.assign({ ...data, ...values });
    onSubmit(submitData);
  };

  return (
    <Form
      form={form}
      layout={"inline"}
      onFinish={onFinish}
      style={{ marginBottom: "16px" }}
    >
      <Form.Item
        name="module"
        style={{ flex: "auto" }}
      >
        <Input placeholder="请输入模块关键字" />
      </Form.Item>
      <Form.Item
        name="packageName"
        style={{ flex: "auto" }}
      >
        <Input placeholder="请输入包关键字" />
      </Form.Item>
      <Form.Item
        name="className"
        style={{ flex: "auto" }}
      >
        <Input placeholder="请输入类关键字" />
      </Form.Item>
      <Form.Item
        name="name"
        style={{ flex: "auto" }}
      >
        <Input placeholder="请输入方法关键字" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
    </Form>
  )
}

export default forwardRef(SearchForm);
