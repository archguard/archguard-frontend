import React from 'react'
import { Form, Row, Col, Select, Button } from 'antd'
import { FormItemOption } from '@/types/form'

interface ModuleDependenceArgsFormProps {
  options: FormItemOption[];
  onFinish(values: {
    moduleAName?: string,
    moduleBName?: string
  }): void;
}

const ModuleDependenceArgsForm = (props: ModuleDependenceArgsFormProps) => {
  const { options, onFinish } = props
  const [form] = Form.useForm()

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={10} key="logic-module-A">
          <Form.Item
            name="moduleAName"
            rules={[{
              required: true,
              message: '逻辑模块A必填',
            }]}
          >
            <Select
              placeholder="逻辑模块A"
              style={{ width: "100%" }}
              showSearch>
              {options.map(item => {
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
        <Col span={10} key="logic-module-B">
          <Form.Item
            name="moduleBName"
            rules={[{
              required: true,
              message: '逻辑模块B必填',
            }]}
          >
            <Select
              placeholder="逻辑模块B"
              style={{ width: "100%" }}
              showSearch>
              {options.map(item => {
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
        <Col span={4}>
          <Button type="primary" htmlType="submit">查询</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default ModuleDependenceArgsForm
