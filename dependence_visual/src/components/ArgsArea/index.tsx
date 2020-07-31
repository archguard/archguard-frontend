import React from "react";
import { Button, Col, Input, notification, Radio, Row, Select } from "antd";
import { useControllableValue } from "ahooks";
import { useEffect } from "react";
import { ButtonType } from 'antd/lib/button';
import { FloatProperty } from 'csstype';
import { FormItemModel, Validator } from '@/models/form';

interface ArgsAreaProps {
  formItems: FormItemModel[];
  buttons: ArgsAreaButton[];
  defaultFormData: any;
}

interface FormItemProps {
  item: FormItemModel;
  value: string;
  onChange: Function;
}

interface argsType {
  dependenceType: "caller" | "callee";
  matchType: string;
  className: string;
  moduleAName: string;
  moduleBName: string;
}

export interface ArgsAreaButton {
  id: string;
  span: number;
  type: ButtonType;
  float: FloatProperty;
  text: string;
  onClick(args: argsType, v: Validator): void;
}

function FormItem(props: FormItemProps) {
  const { item, value, onChange } = props;
  if (item.type === "select") {
    item.options = item.options || []
    return (
      <Select
        placeholder={item.label}
        value={value}
        mode={item.mode}
        style={{ width: "100%" }}
        showSearch
        onChange={(value) => onChange(item.id, value)}
        tokenSeparators={item.tokenSeparators}
      >
        {item.options.map(item => {
          return (
            <Select.Option value={item.value} key={item.value}>
              {item.label}
            </Select.Option>
          );
        })}
      </Select>
    );
  } else if (item.type === "radio") {
    return (
      <Radio.Group
        value={value}
        options={item.options}
        onChange={(e) => onChange(item.id, e.target.value)}
      />
    );
  } else {
    return (
      <Input
        placeholder={item.label}
        value={value}
        type={item.type}
        min={item.min}
        max={item.max}
        onChange={(e) => onChange(item.id, e.target.value)}
      />
    );
  }
}

export default function ArgsArea(props: ArgsAreaProps) {
  const { formItems, buttons, defaultFormData } = props;
  const [value = {}, setValue] = useControllableValue(props, { defaultValue: defaultFormData });
  console.log(value, 'argsArea')

  const onItemValueChange = (id: string, itemVal: string) => {
    setValue({
      ...value,
      [id]: itemVal,
    });
  };

  useEffect(() => {
    setValue(defaultFormData);
  }, [defaultFormData, setValue]);

  const validateForm = (): Validator => {
    for (const item of formItems) {
      if (item.required && !value[item.id]) {
        const message = item.label + "必填";
        notification.warn({
          message,
        });
        return { isValidate: false, message };
      }

      if (typeof item.validate === "function") {
        const validate = item.validate(value[item.id]);
        if (validate && validate.isValidate === false) {
          notification.warn({
            message: validate.message,
          });
          return validate;
        }
      }
    }
    return { isValidate: true, message: "" };
  };

  return (
    <div>
      <Row align="middle">
        {formItems.map((item) => {
          return (
            <Col span={item.span || 8} key={item.id} style={{ padding: "8px 8px 8px 0" }}>
              <FormItem item={item} value={value[item.id]} onChange={onItemValueChange} />
            </Col>
          );
        })}
        {buttons.map((item, index) => {
          return (
            <Col span={item.span || 8} key={item.id || index} style={{ padding: "8px" }}>
              <Button
                onClick={() => item.onClick(value, validateForm())}
                type={item.type}
                style={{ float: item.float }}
              >
                {item.text}
              </Button>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
