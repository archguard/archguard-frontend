import React from "react";
import classNames from "classnames";
import "./Card.less";

interface BaCardProps {
  className?: string;
  children?: React.ReactNode;
}

export const BaCard = (props: BaCardProps) => {
  return <div className={classNames("BaCard", props.className)}>{props.children}</div>;
};

BaCard.defaultProps = {};
