import React from "react";
import { queryProjectOverView } from "api/addition/projectOverview";
export default class ProjectOverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    queryProjectOverView().then(res => {
      this.setState({ data: res });
    });
  }

  render() {
    const data = this.state.data;
    return (
      <div>
        <p>代码行数：<strong>{data.codeLines}</strong>行</p>
        <p>提交数：<strong>{data.commitCount}</strong>次</p>
        <p>开发人数：<strong>{data.contributors}</strong>人</p>
      </div>
    );
  }
}
