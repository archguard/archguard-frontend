import React, { useState } from "react";
import "./Badge.less";

interface BaBadgeProps {
  children: React.ReactNode;
  value: string | number;
  reposition?: boolean; //设置为true时，当附着元素宽高更新时,会自动需要更新该组件的 top 和 right
}

const POSITION_DEFAULT = {
  value: { top: 3, right: 7 },
  icon: { top: 0, right: 0 },
};

const POSITION_HOVER = {
  value: { top: -6, right: -5 },
  icon: { top: -9, right: -12 },
};

export const BaBadge = (props: BaBadgeProps) => {
  const [position, setPosition] = useState(POSITION_DEFAULT);

  return (
    <div className="BaBadge">
      <div
        className="BaBadge-content"
        onMouseEnter={() => {
          if (props.reposition) {
            setPosition(POSITION_HOVER);
          }
        }}
        onMouseLeave={() => {
          if (props.reposition) {
            setPosition(POSITION_DEFAULT);
          }
        }}
      >
        {props.children}
      </div>
      <div
        style={{ top: position.icon.top, right: position.icon.right }}
        className="BaBadge-icon"
      ></div>
      <div
        style={{ top: position.value.top, right: position.value.right }}
        className="BaBadge-value"
      >
        {props.value}
      </div>
    </div>
  );
};

BaBadge.defaultProps = {
  reposition: false,
};
