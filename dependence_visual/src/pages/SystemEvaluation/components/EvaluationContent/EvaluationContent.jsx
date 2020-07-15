import React from "react";

import { data } from "./data";
import { colors } from "config/colors";
import EvaluationItem from './components/EvaluationItem'

// import "mock/evaluation"

export default class EvaluationContent extends React.Component {

  render() {
    return (
      <div>
        {data.map((item, index) => (
          <EvaluationItem key={index} item={item} color={colors[index]}/>
        ))}
      </div>
    );
  }
}
