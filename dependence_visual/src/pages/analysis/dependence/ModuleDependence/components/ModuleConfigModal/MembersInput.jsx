import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EditableTag from "@/components/editable-tag";
import { useList } from "react-use";
import "./index.less";

export default function MembersInput(props) {
  const { value, onChange, options } = props;

  const [ownValue, { set: setOwnValue, push: addValue, updateAt: editValueAt, removeAt }] = useList(
    value ?? [],
  );

  const [showAddInput, setShowAddInput] = useState(false);

  useEffect(() => {
    setOwnValue(value ?? []);
  }, [value, setOwnValue]);

  function onAdd(val) {
    addValue(val);
    setShowAddInput(false);
  }

  function onRemove(index) {
    removeAt(index);
  }

  function onEdit(value, index) {
    editValueAt(index, value);
  }

  useEffect(() => {
    onChange && onChange(ownValue);
  }, [ownValue, onChange]);

  return (
    <div className="members-input">
      {ownValue.map((item, index) => {
        return (
          <EditableTag
            closable
            onRemove={() => onRemove(index)}
            value={item}
            onChange={(item) => onEdit(item, index)}
            autoCompleteOptions={options}
          />
        );
      })}

      {showAddInput && (
        <EditableTag
          isEdit
          onChange={onAdd}
          autoCompleteOptions={options}
          onCancel={() => setShowAddInput(false)}
        />
      )}
      {!showAddInput && (
        <Button
          type="dashed"
          size="small"
          onClick={() => setShowAddInput(true)}
          icon={<PlusOutlined />}
        >
          添加
        </Button>
      )}
    </div>
  );
}
