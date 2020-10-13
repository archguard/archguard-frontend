import React from "react";
import "./Badge.less";

interface BaBadgeProps {
  value: string | number;
}

export const BaBadge = (props: BaBadgeProps) => {
  return (
    <div className="BaBadge">
      <div className="BaBadge-icon">
        <div className="BaBadge-value">{props.value}</div>
      </div>
    </div>
  );
};

BaBadge.defaultProps = {
  reposition: false,
};
