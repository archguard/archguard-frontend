import React, { useState } from "react";
import { Button, Form, Input, Tabs } from "antd";
import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { SizingEvaluationIssuesConfigs } from "./SizingEvaluationIssuesList.config";

const SizingEvaluation = () => {
  const [parameter, setParameter] = useState({});

  const onFinish = (values: any) => {
    console.log('finish data values: ', values);
    setParameter(values);
  }

  return (
    <div>
      <Form
        onFinish={onFinish}
      >
        <Form.Item
          name="module"
        >
          <Input placeholder="请输入模块关键字" />
        </Form.Item>
        <Form.Item
          name="packageName"
        >
          <Input placeholder="请输入包关键字" />
        </Form.Item>
        <Form.Item
          name="className"
        >
          <Input placeholder="请输入类关键字" />
        </Form.Item>
        <Form.Item
          name="name"
        >
          <Input placeholder="请输入方法关键字" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
        </Button>
        </Form.Item>
      </Form>
      <Tabs onChange={() => { }} type="card">
        <Tabs.TabPane tab="过大的方法" key="method">
          <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.METHOD} parameter={parameter} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="过大的类" key="class">
          <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.CLASS} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="过大的包" key="package">
          <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.PACKAGE} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="过大的模块" key="module">
          <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.MODULE} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default SizingEvaluation;
