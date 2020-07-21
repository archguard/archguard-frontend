import React from 'react'
import { Form, Space, Input, Button, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { FormItem } from './config'

const ConfigForm = (props) => {
  const { configType, formItems, data, updateConfig } = props
  const getDefaultConfigValue = () =>
    formItems.map((item: FormItem) => {
      const obj = {}
      obj[item.id] = item.defaultValue
      return obj
    })

  const defaultConfigValue = Object.assign({}, ...getDefaultConfigValue())
  const onFinish = (values) => {
    values[configType].map(item => {
      if (!item.type) item.type = configType
      return item
    })
    return updateConfig(values)
  }

  const renderInputByFormItem = (field, item: FormItem) => {
    return (
      <Form.Item
        {...field}
        name={[field.name, item.id]}
        fieldKey={[field.fieldKey, item.id]}
        rules={item.rules || []}
        style={item.style}
      >
        <Input type={item.type} placeholder={item.label} />
      </Form.Item>
    )
  }

  const renderSelectByFormItem = (field, item) => {
    return (
      <Form.Item
        {...field}
        name={[field.name, item.id]}
        fieldKey={[field.fieldKey, item.id]}
      >
        <Select
          placeholder={ item.label }
          style={{ minWidth: "170px" }}
        >
          { item.options.map(item => {
            return (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    )
  }

  return (
    <Form autoComplete="off" initialValues={data} onFinish={onFinish}>
      <Form.List name={configType}>
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <Space key={field.name} align="baseline">
                  { formItems.map(item => item.type === 'select' ?
                      renderSelectByFormItem(field, item) :
                      renderInputByFormItem(field, item))}
                  <MinusCircleOutlined
                    onClick={() => { remove(field.name) }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" block
                  onClick={() => { add(defaultConfigValue) }}>
                  <PlusOutlined /> 新增
                </Button>
              </Form.Item>
            </div>
          )
        }}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ConfigForm
