import React, { useState } from "react";
import { Button, Form, Input, Tabs } from "antd";
import IssuesList from "@/components/Business/IssuesList/IssuesList";
import { SizingEvaluationIssuesConfigs } from "./SizingEvaluationIssuesList.config";

const SizingEvaluation = () => {
  const [parameter, setParameter] = useState({});

  const onFinish = (values: any) => {
    setParameter(values);
  }

  return (
    <div>
      <Form
        layout={"inline"}
        onFinish={onFinish}
        style={{ marginBottom: "16px" }}
      >
        <Form.Item
          name="module"
          style={{ flex: "auto" }}
        >
          <Input placeholder="请输入模块关键字" />
        </Form.Item>
        <Form.Item
          name="packageName"
          style={{ flex: "auto" }}
        >
          <Input placeholder="请输入包关键字" />
        </Form.Item>
        <Form.Item
          name="className"
          style={{ flex: "auto" }}
        >
          <Input placeholder="请输入类关键字" />
        </Form.Item>
        <Form.Item
          name="name"
          style={{ flex: "auto" }}
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
          <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.CLASS} parameter={parameter} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="过大的包" key="package">
          <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.PACKAGE} parameter={parameter} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="过大的模块" key="module">
          <IssuesList issuesConfig={SizingEvaluationIssuesConfigs.MODULE} parameter={parameter} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default SizingEvaluation;
