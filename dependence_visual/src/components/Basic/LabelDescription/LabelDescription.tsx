import "./LabelDescription.less";
import React from "react";

export interface IBaLabelDescription {
  label: string;
  description?: string;
  hiddenColon?: boolean;
}

export function BaLabelDescription(props: IBaLabelDescription) {
  const { label, description, hiddenColon } = props;

  return (
    <div className="BaLabelDescription">
      <span className="BaLabelDescription-label">
        <strong>{label}</strong>
      </span>
      {!hiddenColon && <span className="BaLabelDescription-colon">：</span>}
      <span className="BaLabelDescription-description">{description}</span>
    </div>
  );
}
