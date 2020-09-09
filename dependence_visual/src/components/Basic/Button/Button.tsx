import React from "react";
import "./Button.less";

interface BaButton {
  children?: any;
  onClick?: () => void;
  type?: "primary" | "blank";
  size?: "small" | "middle" | "big";
}

export function BaButton(props: BaButton) {
  return (
    <div className="BaButton" onClick={props.onClick}>
      {props.children}
    </div>
  );
}
