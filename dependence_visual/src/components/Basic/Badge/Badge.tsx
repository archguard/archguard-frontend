import React from "react";
import './Badge.less'

interface BaBadgeProps {
  children?: React.ReactNode;
}

export const BaBadge = (props: BaBadgeProps) => {
  return (
    <div className="BaBadge">
      {props.children}
    </div>
  );
};

BaBadge.defaultProps = {};
