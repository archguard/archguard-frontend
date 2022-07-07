import React from "react";
import classNames from "classnames";
import "./Button.less";

interface BaButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "primary" | "blank";
  size?: "small" | "middle" | "big";
}

export function BaButton(props: BaButtonProps) {
  return (
    <div className={classNames("BaButton", props.className)} onClick={props.onClick}>
      {props.children}
    </div>
  );
}
