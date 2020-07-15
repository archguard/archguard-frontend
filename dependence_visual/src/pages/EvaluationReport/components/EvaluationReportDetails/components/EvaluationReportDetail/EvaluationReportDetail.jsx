import React from "react";

import NumberArea from "./components/NumberArea";
import ArrayArea from "./components/ArrayArea";

import { mapToLabel } from "../../../../config";

export default class EvaluationReportDetail extends React.Component {
  render() {
    let data = this.props.data || {};
    data = Object.keys(data).map((key) => ({
      type: mapToLabel(key),
      data: data[key],
    }));
    return (
      <div>
        <NumberArea data={data.filter((item) => !Array.isArray(item.data))} />
        <ArrayArea data={data.filter((item) => Array.isArray(item.data))} />
      </div>
    );
  }
}
