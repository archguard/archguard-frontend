import React from "react";
import styles from "./Summary.less";

import { Chart, Tooltip, Interval, Coordinate, Interaction, Legend } from "bizcharts";
import QualityEvaluation from "./components/QualityEvaluation";

function Summary() {
  return (
    <div>
      <div className={styles.header}>111111111</div>
      <div className={styles.body}>
        <QualityEvaluation />
      </div>
    </div>
  );
}

export default Summary;
