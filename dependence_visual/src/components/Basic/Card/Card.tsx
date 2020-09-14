import React from "react";
import './Card.less'

interface BaCardProps {
  children?: React.ReactNode;
}

export const BaCard = (props: BaCardProps) => {
  return (
    <div className="BaCard">
      {props.children}
    </div>
  );
};

BaCard.defaultProps = {};
