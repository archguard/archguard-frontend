import React, { useEffect, useState } from "react";
import styles from "./Summary.less";
import QualityEvaluation from "./components/QualityEvaluation";
import { XButton } from "@/components/Button/Button";
import { getOverview, Overview } from "@/api/module/overview";

function Summary() {
  const [summary, setSummary] = useState<Overview[]>([]);

  useEffect(() => {
    getOverview().then((res) => {
      setSummary(res.data);
    });
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.name}>架构质量评估</div>
          <div className={styles.date}>15Jul2020</div>
        </div>
        <XButton>下载详细报告</XButton>
      </div>

      <div className={styles.body}>
        <QualityEvaluation data={summary} />
      </div>
    </div>
  );
}

export default Summary;
