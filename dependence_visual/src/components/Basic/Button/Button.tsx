import React from "react";
import "./Button.less";

interface BaButton {
  children?: any;
  type?: "primary" | "blank";
  size?: "small" | "middle" | "big";
}

export function BaButton(props: BaButton) {
  return <div className="BaButton">{props.children}</div>;
}
