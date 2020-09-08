import React from "react";
import styles from "./Button.less";

interface BaButton {
  children?: any;
  type?: "primary" | "blank";
  size?: "small" | "middle" | "big";
}

export function BaButton(props: BaButton) {
  return <div className={styles.BaButton}>{props.children}</div>;
}
