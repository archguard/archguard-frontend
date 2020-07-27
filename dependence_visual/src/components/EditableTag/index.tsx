import React, { useEffect, useState } from "react";
import "./index.less";
import { AutoComplete, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface EditableTagProps {
  value: string;
  closable: boolean;
  isEdit: boolean;
  autoCompleteOptions: any[];
  onChange: Function;
  onRemove: Function;
  onCancel: Function;
}

export default function EditableTag(props: EditableTagProps) {
  const {
    value,
    onChange,
    closable,
    isEdit,
    onRemove,
    autoCompleteOptions = [],
    onCancel,
  } = props;

  const [ownValue, setOwnValue] = useState(value);
  const [editing, setEditing] = useState(isEdit);

  useEffect(() => {
    setOwnValue(value);
  }, [value]);

  function onOwnCancel() {
    onCancel && onCancel();
    setOwnValue(value);
    setEditing(false);
  }

  function onConfirm() {
    if (ownValue?.trim()) {
      onChange && onChange(ownValue);
      setEditing(false);
    }
  }

  return (
    <div className="editable-tag">
      {!editing ? (
        <Tag closable={closable} onClose={onRemove} onDoubleClick={() => setEditing(true)}>{value}</Tag>
      ) : (
        <div className="input">
          <AutoComplete
            onChange={setOwnValue}
            size="small"
            options={autoCompleteOptions}
            value={ownValue}
          />
          <CloseCircleOutlined onClick={onOwnCancel}/>
          <CheckCircleOutlined onClick={onConfirm}/>
        </div>
      )}
    </div>
  );
}
