import React from "react";
import { Tooltip } from "antd";
import "./TipsIcon.less";

interface TipsIconProps {
  text: React.ReactNode;
  children?: React.ReactNode;
}

export const BaTipsIcon = (props: TipsIconProps) => {
  return (
    <div className="BaTipsIcon">
      <Tooltip placement="top" title={props.text}>
        <div className="BaTipsIcon-descriptionIcon">{props.children ? props.children : '?'}</div>
      </Tooltip>
    </div>
  );
};

BaTipsIcon.defaultProps = {};
