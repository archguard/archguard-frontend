import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Spin } from "antd";
import "./Loading.css";

let div = document.createElement("div");
document.body.appendChild(div);

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCount: 0
    };
  }

  addCount() {
    const loadingCount = this.state.loadingCount + 1;
    console.log("loadingCount", loadingCount);
    this.setState({ loadingCount });
  }

  reduceCount() {
    const loadingCount = this.state.loadingCount - 1;
    console.log("loadingCount", loadingCount);
    this.setState({ loadingCount });
  }

  render() {
    return (
      <div
        className={this.state.loadingCount ? "loading-warp" : "loading-hidden"}
      >
        <Spin size="large" />
      </div>
    );
  }
}

export default ReactDOM.render(React.createElement(Loading), div);
