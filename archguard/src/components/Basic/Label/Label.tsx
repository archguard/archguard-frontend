import React from "react";
import classNames from "classnames";
import "./Label.less";

export interface IBaLabel {
  text: string;
  value?: string | number;
  children?: React.ReactNode;
  className?: string;
}

export function BaLabel(props: IBaLabel) {
  const { value, text, children } = props;
  return (
    <div className={classNames("BaLabel", props.className)}>
      <div className="BaLabel-value">{value ?? children}</div>
      <div className="BaLabel-text">{text}</div>
    </div>
  );
}
