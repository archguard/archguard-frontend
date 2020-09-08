import "./Grade.less";
import React from "react";
import { BaLabel, IBaLabel } from "@/components/Basic/Label/Label";

enum Color {
  a = "",
  b = "",
  c = "#de8c72",
}

interface BuGrade extends Omit<IBaLabel, "value"> {
  grade: keyof typeof Color;
}

export function BuGrade(props: BuGrade) {
  return (
    <div className="BuGrade">
      <BaLabel text={props.text}>
        <div className="BuGrade-grade-icon">{props.grade.toUpperCase()}</div>
      </BaLabel>
    </div>
  );
}
