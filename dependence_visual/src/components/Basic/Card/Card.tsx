import React from "react";
import './Card.less'

interface BaCardProps {
  children?: React.ReactChildren;
  header: () => React.ReactElement;
}

export const BaCard = (props: BaCardProps) => {
  const { header } = props;
  return (
    <div className="BaCard">
      <div className="BaCard-header">{header()}</div>
      <div className="BaCard-body">1123</div>
    </div>
  );
};

BaCard.defaultProps = {};
