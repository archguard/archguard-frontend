import { createModule, queryModuleOptions, updateModule} from "@/api/module/module";
import { Form, Input, Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useAsync } from "react-use";
import "./index.less";
import MembersInput from "./MembersInput";
import { Store } from 'antd/lib/form/interface';
import { Module } from "@/types/module";

interface ModuleConfigModalProps {
  visible: boolean;
  onClose(): void;
  onSuccess(): void;
  module: Module;
  systemId: number;
}

function ModuleConfigModal(props: ModuleConfigModalProps) {
  const { visible, onClose, onSuccess, module } = props;
  const formRef = useRef<any>();
  const [moduleNames, setModuleNames] = useState<string[]>([]);

  const title = module?.id ? "修改模块" : "添加模块";
  const { value: options = [] } = useAsync(async () => {
    return queryModuleOptions(props.systemId).then((res) => {
      setModuleNames(res)
      return res.sort().map((i) => ({ label: i, value: i }));
    });
  });

  useEffect(() => {
    formRef.current && formRef.current.setFieldsValue(module);
  }, [module]);

  const onFinish = async (values: Store) => {
    if (module.id) {
      await updateModule({ ...module, ...values }, props.systemId);
      notification.success({
        message: "修改成功！",
      });
    } else {
      await createModule({ ...module, ...values }, props.systemId);
      notification.success({
        message: "新增成功！",
      });
    }
    onSuccess && onSuccess();
  };

  const onOk = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <Modal
      width={800}
      title={title}
      onCancel={onClose}
      open={visible}
      onOk={onOk}
      destroyOnClose={true}
    >
      <Form ref={formRef} initialValues={module} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="逻辑模块名"
          name="name"
          rules={[{
            required: true,
            message: "请输入逻辑模块名!"
          }, () => ({
            validator(rule, value) {
              if (!moduleNames.includes(value)) {
                return Promise.resolve();
              }
              return Promise.reject('逻辑模块名重复！');
            },
          })]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="members" name="members">
          <MembersInput options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModuleConfigModal;
