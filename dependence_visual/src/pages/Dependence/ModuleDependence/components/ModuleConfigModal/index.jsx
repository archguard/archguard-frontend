import React, {useEffect, useRef} from "react";
import {Form, Input, Modal, notification, Select} from "antd";
import "./index.less";
import {useAsync} from "react-use";
import {createModule, queryModuleOptions, updateModule} from "../../../../../api/module/module";
import MembersInput from "./MembersInput";

const Option = Select.Option;

function ModuleConfigModal(props) {
  const {visible, onClose, onSuccess, module} = props;
  const formRef = useRef();

  const title = module?.id ? "修改模块" : "添加模块";
  const {value: options = []} = useAsync(async () => {
    return queryModuleOptions().then((res) => {
      return res.sort().map((i) => ({label: i, value: i}));
    });
  });

  useEffect(() => {
    formRef.current && formRef.current.setFieldsValue(module)
  }, [module])

  const onFinish = async (values) => {
    if (module.id) {
      await updateModule({...module, ...values})
      notification.success({
        message: "修改成功！",
      });
    } else {
      await createModule({...module, ...values})
      notification.success({
        message: "新增成功！",
      });
    }
    onSuccess && onSuccess()
  };

  const onOk = () => {
    if (formRef.current) {
      formRef.current.submit()
    }
  }

  return (
    <Modal width={800} title={title} onCancel={onClose} visible={visible} onOk={onOk}>
      <Form ref={formRef} initialValues={module} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="逻辑模块名"
          name="name"
          rules={[{required: true, message: "请输入逻辑模块名!"}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item label="members" name="members">
          <MembersInput options={options}/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModuleConfigModal
