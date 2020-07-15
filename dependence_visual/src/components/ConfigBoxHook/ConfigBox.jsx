import React, { useState } from 'react';
import { Button, Row, Col, notification } from "antd";
import ConfigBoxItem from './ConfigBoxItem';
import './ConfigBox.css'

export default function ConfigBox(props) {
  const {
    label,
    data = [],
    formItems = [],
    queryData,
    createItem,
    updateItem,
    deleteItem,
    resetConfigs,
  } = props
  console.log(label, data, formItems, queryData)
  const _buttonsSpan = getButtonsSpan(formItems)
  const [dataList, setDataList] = useState(data)
  const [showNewItem, setShowNewItem] = useState(false)
  const [buttonsSpan, setButtonsSpan] = useState(_buttonsSpan)

  function resetDataList(dataList) {
    setDataList(dataList)
    resetConfigs && resetConfigs(dataList);
  }

  function updateItemHandle(item) {
    updateItem(item).then(res => {
      notification.success({
        message: `修改${label}成功！`,
      });
      dataList.forEach(configItem => {
        if (configItem.id === item.id) {
          configItem = item;
        }
      });
      resetDataList(dataList);
    });
  }

  function addItemHandle(item) {
    createItem(item).then(res => {
      notification.success({
        message: `新增${label}成功！`,
      });
      resetDataList([...dataList, { ...item, id: res.id }]);
      setShowNewItem(false)
    })
  }

  function deleteItemHandle(id) {
    deleteItem({ id }).then(res => {
      notification.success({
        message: `删除${label}成功！`,
      });
      const index = dataList.findIndex((item) => item.id === id);
      dataList.splice(index, 1);
      resetDataList(dataList);
    })
  }

  function renderAddItem() {
    return showNewItem ? (
      <ConfigBoxItem
        key="temp"
        isNewItem={true}
        formItems={formItems}
        addItem={item => addItemHandle(item)}>
      </ConfigBoxItem>
    ) : (
      <Button type="primary" onClick={() => setShowNewItem(true)}>新增</Button>
    )
  }

  if (queryData) {
    queryData().then(res => setDataList(res));
  }

  return (
    <div className="config-box">
      <Row gutter={16}>
        { formItems.map(item => {
            if (item.hidden) return
            return (
              <Col span={ item.span } key={ item.id }>
                <p>{ item.label }</p>
              </Col>
            )
        })}
      </Row>
      { dataList.map((item, index) => {
          return(
            <ConfigBoxItem
              key={item.id}
              item={item}
              buttonsSpan={buttonsSpan}
              formItems={formItems}
              updateItem={item => updateItemHandle(item)}
              deleteItem={id => deleteItemHandle(id)}
            ></ConfigBoxItem>
          )
      })}
      { renderAddItem() }
    </div>
  );
}

function getButtonsSpan(formItems) {
  return 24 - formItems
         .filter(item => !item.hidden)
         .reduce((sum, item) => sum + item.span, 0)
}