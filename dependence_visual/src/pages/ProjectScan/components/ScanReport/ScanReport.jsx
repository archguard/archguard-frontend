import React from "react";
import { Collapse } from "antd";

import TestProtect from './components/TestProtect'
import ChangeImpact from './components/ChangeImpact'
import CodeSpecification from './components/CodeSpecification'

const { Panel } = Collapse;

export default function ScanReport() {
  return (
    <div>
      <Collapse>
        <Panel header="测试保护" key={1}>
          <TestProtect />
        </Panel>
        <Panel header="变更影响" key={2}>
          <ChangeImpact />
        </Panel>
        <Panel header="模块耦合" key={3}>
          <p>循环依赖：xxx</p>
        </Panel>
        <Panel header="数据库耦合" key={4}>
          <p>。。。</p>
        </Panel>
        <Panel header="分层架构" key={5}>
          <p>代码层级：xxx</p>
          <p>分层数量：xxx</p>
        </Panel>
        <Panel header="API规范" key={6}>
          <p>。。。</p>
        </Panel>
        <Panel header="代码规范" key={7}>
          <CodeSpecification />
        </Panel>
      </Collapse>
    </div>
  );
}
