import React from "react";
import { Tooltip } from "antd";
import "./TipsIcon.less";

interface TipsIconProps {
  text: string;
}

export const BaTipsIcon = (props: TipsIconProps) => {
  return (
    <div className="BaTipsIcon">
      <Tooltip placement="top" title={props.text}>
        <div className="BaTipsIcon-descriptionIcon">?</div>
      </Tooltip>
    </div>
  );
};

BaTipsIcon.defaultProps = {};
