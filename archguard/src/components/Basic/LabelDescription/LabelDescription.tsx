import React from "react";
import classNames from "classnames";
import "./LabelDescription.less";

export interface IBaLabelDescription {
  label: string;
  description?: string;
  hiddenColon?: boolean;
  className?: string;
}

export function BaLabelDescription(props: IBaLabelDescription) {
  const { label, description, hiddenColon } = props;

  return (
    <div className={classNames("BaLabelDescription", props.className)}>
      <span className="BaLabelDescription-label">
        <strong>{label}</strong>
      </span>
      {!hiddenColon && <span className="BaLabelDescription-colon">：</span>}
      <pre className="BaLabelDescription-description">{description}</pre>
    </div>
  );
}
