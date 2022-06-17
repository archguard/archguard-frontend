import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useList } from "react-use";
import "./index.less";
import { FormItemOption } from '@/types/form';
import EditableTag from '@/components/Business/EditableTag';

interface MembersInputProps {
  value?: string[];
  options: FormItemOption[];
  onChange?(v?: string[]): void;
}
export default function MembersInput(props: MembersInputProps) {
  const { value, onChange, options } = props;

  const [ownValue, { set: setOwnValue, push: addValue, updateAt: editValueAt, removeAt }] = useList<string>(
    value ?? [],
  );

  const [showAddInput, setShowAddInput] = useState(false);

  useEffect(() => {
    setOwnValue(value ?? []);
  }, [value, setOwnValue]);

  function onAdd(val: string) {
    addValue(val);
    setShowAddInput(false);
  }

  function onRemove(index: number) {
    removeAt(index);
  }

  function onEdit(value: string, index: number) {
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
            key={item}
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
