import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';

interface ProjectInfoFormProps {
  onFinish(values: Store): void;
}
const ProjectInfoForm = (props: ProjectInfoFormProps, ref: any) => {
  const { onFinish } = props
  const [form] = useForm()

  useImperativeHandle(ref, () => ({
    submit: () => form.submit(),
    clear: () => form.resetFields(
      ['projectName', 'repoType', 'username', 'password', 'repo'])
  }))

  return (
    <div className="project-info-form">
      <h2>创建新系统</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ repoType: 'GIT' }}>
        <Form.Item
          name="projectName"
          label="项目名称"
          rules={[{ required: true, message: '请输入项目名称！' }]}
          required>
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item
          name="repoType"
          label="仓库类型"
          rules={[{ required: true, message: '请选择仓库类型！' }]}
          required>
          <Select>
            {['GIT', 'SVN'].map((value) => (
              <Select.Option
                value={value}
                key={value}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="username"
          label="仓库用户名">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          label="仓库密码">
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="repo"
          label="仓库地址"
          rules={[{ required: true, message: '请输入正确的项目地址！' }]}
          required>
          <Input placeholder="请输入项目地址" />
        </Form.Item>
      </Form>
    </div>
  )
}
export default forwardRef(ProjectInfoForm);
