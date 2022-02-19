import React, { useState } from 'react'
import { Form, Space, Input, Button, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import './index.less'
import { FormItemModel } from '@/models/form'
import { ConfigData } from './config'

interface FieldData {
  name: number;
  key: number;
  fieldKey: number;
}

interface ConfigFormProps {
  configType: string;
  formItems: FormItemModel[];
  data: any;
  updateConfig: Function;
}

const ConfigForm = (props: ConfigFormProps) => {
  const { configType, formItems, data, updateConfig } = props

  const getDefaultConfigValue = () =>
    formItems.map((item) => {
      const obj: any = {}
      obj[item.id] = item.defaultValue
      return obj
    })

  const defaultConfigValue = Object.assign({}, ...getDefaultConfigValue())
  const onFinish = (values: ConfigData) => {
    values[configType].map(item => {
      if (!item.type) item.type = configType
      return item
    })
    return updateConfig(values)
  }

  const renderHeader = () => {
    return (
      <Space className="form-items header">
        { formItems.map((item) => (
          <div key={item.id}>{item.label}</div>
        )) }
      </Space>
    )
  }

  const renderInputByFormItem = (field: FieldData, item: FormItemModel) => {
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

  const renderSelectByFormItem = (field: FieldData, item: FormItemModel) => {
    if (!item.options) return
    return (
      <Form.Item
        {...field}
        name={[field.name, item.id]}
        fieldKey={[field.fieldKey, item.id]}
      >
        <Select
          placeholder={ item.label }
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
      {renderHeader()}
      <Form.List name={configType}>
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <Space key={field.name} className="form-items">
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
