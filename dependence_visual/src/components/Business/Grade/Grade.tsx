import "./Grade.less";
import React from "react";
import { BaLabel, IBaLabel } from "@/components/Basic/Label/Label";

export enum Color {
  a = "",
  b = "",
  c = "#de8c72",
}

interface BuGradeProps extends Omit<IBaLabel, "value"> {
  grade: keyof typeof Color;
}

export function BuGrade(props: BuGradeProps) {
  return (
    <div className="BuGrade">
      <BaLabel text={props.text}>
        <div className="BuGrade-grade-icon">{props.grade.toUpperCase()}</div>
      </BaLabel>
    </div>
  );
}

BuGrade.defaultProps = {
  text: "",
  grade: "c",
};
