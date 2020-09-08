import React from "react";
import styles from "./Button.less";

interface XButton {
  children?: any;
  type?: "primary" | "blank";
  size?: "small" | "middle" | "big";
}

export function XButton(props: XButton) {
  return <div className={styles.XButton}>{props.children}</div>;
}
