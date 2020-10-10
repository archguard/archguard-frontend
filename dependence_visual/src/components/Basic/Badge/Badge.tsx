import React, { useState } from "react";
import "./Badge.less";

interface BaBadgeProps {
  children?: React.ReactNode;
  value: string | number;
  update?: () => void; //当附着元素，宽高更新时，需要更新组件的 top 和 right
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

  function onMouseEnter() {
    setPosition(POSITION_HOVER);
  }

  const onMouseLeave = () => {
    setPosition(POSITION_DEFAULT);
  };

  return (
    <div className="BaBadge">
      <div className="BaBadge-content" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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

BaBadge.defaultProps = {};
