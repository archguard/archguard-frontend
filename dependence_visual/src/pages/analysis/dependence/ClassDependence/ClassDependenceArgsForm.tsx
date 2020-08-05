import React from 'react'
import { Form, Row, Col, Select, Button, Input } from 'antd'
import { FormItemOption } from '@/models/form'
import { useAsync } from 'react-use'
import { queryPackageDependencies } from '@/api/module/package'

const dependenceTypeOptions: FormItemOption[] = [{
    label: "类的依赖",
    value: "dependencies",
  }, {
    label: "类的类调用依赖",
    value: "invokes",
  }, {
    label: "类所有方法对外调用依赖",
    value: "methods_callees",
  }]

interface ClassDependenceArgsFormProps {
  onFinish(values: {
    module?: string,
    className?: string,
    dependenceType?: string,
    deep?: number,
  }): void;
}

const ClassDependenceArgsForm = (props: ClassDependenceArgsFormProps) => {
  const { value: allDependence = [] } = useAsync(queryPackageDependencies);
  const { onFinish } = props
  const [form] = Form.useForm()

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={24} key="dependence-module">
        <Col span={6}>
          <Form.Item
            name="module">
            <Select
              placeholder="模块"
              style={{ width: "100%" }}
              showSearch>
              {allDependence.map(({ module }, index) => {
                  return (
                    <Select.Option
                      value={index}
                      key={module}>
                      {module}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6} key="class-name">
          <Form.Item
            name="className"
            rules={[{
              required: true,
              message: '类名必填',
            }]}
          >
            <Input placeholder="类名"></Input>
          </Form.Item>
        </Col>
        <Col span={4} key="dependence-type">
          <Form.Item
            name="dependenceType"
            rules={[{
              required: true,
              message: '依赖方式必填',
            }]}>
            <Select
              placeholder="依赖方式"
              style={{ width: "100%" }}
              showSearch>
              {dependenceTypeOptions.map(item => {
                return (
                  <Select.Option
                    value={item.value}
                    key={item.value}>
                      {item.label}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4} key="deep">
          <Form.Item
            name="deep"
            rules={[{
              required: false,
              message: '调用深度需大于1',
              min: 1,
              type: 'number',
              transform: value => {
                if (value) {
                  return Number(value)
                }
                return 1;
              }
            }]}
          >
            <Input type="number" placeholder="调用深度"></Input>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button type="primary" htmlType="submit">查询</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default ClassDependenceArgsForm
