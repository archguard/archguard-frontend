import React from "react";
import { Divider, Tooltip, Button } from "antd";
import { withRouter } from "react-router-dom";
import { queryEvaluationList } from "../../../api/addition/evaluations";
import SyncOutlined from "@ant-design/icons/SyncOutlined";

// import "mock/evaluationReport";

class HistoryReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showListNum: 5,
    };
  }

  componentDidMount() {
    this.updateEvaluationList();
  }

  updateEvaluationList() {
    queryEvaluationList().then((res) => {
      this.setState({ data: res });
    });
  }

  renderShowMore() {
    if (this.state.data.length <= this.state.showListNum) return;
    return (
      <div style={{ textAlign: "center" }}>
        <Button
          type="link"
          onClick={() => this.setState({ showListNum: this.state.showListNum + 5 })}
        >
          查看更多
        </Button>
      </div>
    );
  }

  render() {
    const data = this.state.data.slice(0, this.state.showListNum);
    return (
      <div>
        <h2>
          历史评估报告{" "}
          <Tooltip title="刷新">
            <SyncOutlined onClick={() => this.updateEvaluationList()} />
          </Tooltip>
        </h2>
        <Divider></Divider>
        <div
          style={{
            backgroundColor: "rgba(176,180,180,0.09)",
            padding: "16px",
          }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => this.props.history.push("/system-evaluation/report/" + item.id)}
            >
              <h3>{item.name}</h3>
              <p>{item.createdDate}</p>
            </div>
          ))}
        </div>
        {this.renderShowMore()}
      </div>
    );
  }
}

export default withRouter(HistoryReport);
