import React from "react";
import { Tabs } from "antd";
import EvaluationReportDetail from "./components/EvaluationReportDetail";

import { queryEvaluationDetails } from "api/addition/evaluations";

import { mapToLabel } from "../../config";

export default class EvaluationReportDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      data: {},
    };
  }

  componentDidMount() {
    queryEvaluationDetails(this.state.id).then((res) => {
      console.log("data", res);
      this.setState({ data: res });
    });
  }

  render() {
    const data = this.state.data;
    return (
      <div
        style={{
          backgroundColor: "rgba(176,180,180,0.09)",
          padding: "32px",
        }}
      >
        <Tabs>
          {Object.keys(data).map((key) => {
            if (data[key]) {
              return (
                <Tabs.TabPane tab={mapToLabel(key)} key={key}>
                  <EvaluationReportDetail data={data[key]} />
                </Tabs.TabPane>
              );
            }
          })}
        </Tabs>
      </div>
    );
  }
}
