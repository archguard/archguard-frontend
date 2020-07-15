import React from "react";
import { Divider } from "antd";
import BadSmell from "./components/BadSmell";
import CodeStyle from "./components/CodeStyle";

export default class CodeSpecification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <BadSmell />
        <Divider />
        <CodeStyle />
      </div>
    );
  }
}
