import "./Label.less";
import React from "react";

export interface IBaLabel {
  text: string;
  value?: string | number;
  children?: any;
}

export function BaLabel(props: IBaLabel) {
  const { value, text, children } = props;
  return (
    <div className="BaLabel">
      <div className="BaLabel-value">{value ?? children}</div>
      <div className="BaLabel-text">{text}</div>
    </div>
  );
}
