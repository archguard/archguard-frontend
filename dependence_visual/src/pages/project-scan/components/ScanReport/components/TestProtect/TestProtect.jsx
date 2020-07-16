import React from "react";
import { Divider } from "antd";
import TestBadSmell from "./components/TestBadSmell";
import TestCoverage from './components/TestCoverage'

export default class TestProtect extends React.Component {
  render() {
    return (
      <div>
        <TestBadSmell />
        <Divider />
        <TestCoverage />
      </div>
    );
  }
}
