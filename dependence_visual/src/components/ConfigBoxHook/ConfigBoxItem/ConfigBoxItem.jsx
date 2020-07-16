import React, { Fragment, useState } from 'react';
import { Input, Row, Col, Button, Select, notification } from 'antd'

export default function ConfigBoxItem(props) {
  const {
    isNewItem,
    item = {},
    formItems = [],
    buttonsSpan,
    addItem,
    updateItem,
    deleteItem
  } = props
  const [formData, setFormData] = useState(item)

  function validateFormData(_formdata) {
    for (let item of formItems) {
      if (!_formdata[item.id]) {
        return {
          isValidate: false,
          message: `${item.label}不能为空` }
      }
    }
    return { isValidate: true, message: '' }
  }

  function validateAndGetFormData() {
    const validate = validateFormData(formData)
    if (!validate.isValidate) {
      notification.warn({
        message: validate.message,
      });
      return false;
    }

    return formData;
  }
  
  function onUpdateClick() {
    const formdata = validateAndGetFormData()
    if (!formdata) return
    console.log('update formdata', formdata)
    setFormData(formdata)
    updateItem(formdata)
  }

  function onCreateClick() {
    const formdata = validateAndGetFormData()
    if (!formdata) return
    console.log('create formdata', formdata)
    setFormData(formdata)
    addItem(formdata)
  }

  function onHideClick() {
    console.log('hide and update item')
    formData.status = 'HIDE'
    setFormData(formData)
    updateItem(formData)
  }

  function onShowClick() {
    console.log('show and update item')
    formData.status = 'NORMAL'
    setFormData(formData)
    updateItem(formData)
  }

  function onDeleteClick() {
    deleteItem(formData.id)
  }

  function onChangeHandle(id, value) {
    formData[id] = value
    setFormData({ ...formData });
  }

  function renderColSelect(item) {
    const key = item.id
    return (
      <Col span={ item.span } key={ key }>
        <Select
          placeholder={ item.label }
          value={ formData[key] }
          mode={ item.mode }
          style={{ width: "100%" }}
          onChange={ value => onChangeHandle(key, value) }
          tokenSeparators={ item.tokenSeparators }
        >
          { item.options.map((item) => {
            return (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            );
          })}
        </Select>
      </Col>
    )
  }

  function renderColInput(item) {
    return (
      <Col span={ item.span } key={ item.id }>
        <Input
          placeholder={ item.label }
          value={ formData[item.id] }
          type={ item.type }
          onChange={ e => onChangeHandle(item.id, e.target.value) }
        ></Input>
      </Col>
    );
  }

  function renderFormItems() {
    return (
      <Fragment>
        { formItems.map(item => {
          if (item.hidden) return
          return item.type === 'select' ?
                 renderColSelect(item) : renderColInput(item)
        })}
      </Fragment>
    )
  }

  function renderSavedButton() {
    return (
      <Fragment>
        <Col span={buttonsSpan}>
          <Button onClick={() => onCreateClick()}>保存</Button>
        </Col>
      </Fragment>
    );
  }

  function renderButtons(isNewItem) {
    if (isNewItem) return renderSavedButton()

    const hideButton = (
      <Button onClick = {() => onHideClick()}>隐藏</Button>
    )
    const showButton = (
      <Button type='dashed' onClick = {() => onShowClick()}>展示</Button>
    )
    
    return (
      <Fragment>
        <Col span = { buttonsSpan }>
          <Button onClick={() => onUpdateClick()}>修改</Button>
          <Button danger onClick={() => onDeleteClick()}>删除</Button>
          { formData.status === 'NORMAL' ? hideButton : showButton }
        </Col>
      </Fragment>
    )
  }

  if (!item.key) {
    formItems.forEach(item => {
      formData[item.id] = item.defaultValue
    })
  }

  return (
    <Row gutter={16}>
      { renderFormItems(formItems) }
      { renderButtons(isNewItem) }
    </Row>
  );
}
