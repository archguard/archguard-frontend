import React from "react";
import classNames from "classnames";
import "./Badge.less";

interface BaBadgeProps {
  value: string | number;
  className?: string;
}

export const BaBadge = (props: BaBadgeProps) => {
  return (
    <div className={classNames("BaBadge", props.className)}>
      <div className="BaBadge-icon">
        <div className="BaBadge-value">{props.value}</div>
      </div>
    </div>
  );
};

BaBadge.defaultProps = {
  reposition: false,
};
