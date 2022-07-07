import React from "react";
import { Tooltip } from "antd";
import classNames from "classnames";
import "./TipsIcon.less";

interface TipsIconProps {
  text: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const BaTipsIcon = (props: TipsIconProps) => {
  return (
    <div className={classNames("BaTipsIcon", props.className)}>
      <Tooltip placement="top" title={props.text}>
        <div className="BaTipsIcon-descriptionIcon">{props.children ? props.children : "?"}</div>
      </Tooltip>
    </div>
  );
};

BaTipsIcon.defaultProps = {};
