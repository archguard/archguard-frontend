import React from "react";
import { colors } from "../../../../config/colors";
import { data } from "./data";
import EvaluationItem from "./item";

export default function EvaluationContent() {
  return (
    <div>
      {data.map((item, index) => (
        <EvaluationItem key={index} item={item} color={colors[index]} />
      ))}
    </div>
  );
}
