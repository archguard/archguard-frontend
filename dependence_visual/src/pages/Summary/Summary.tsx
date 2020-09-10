import React from "react";
import styles from "./Summary.less";
import QualityEvaluation from "./components/QualityEvaluation";
import { BaButton } from "@/components/Basic/Button/Button";
import { BaLabel } from "@/components/Basic/Label/Label";
import { BuGrade } from "@/components/Business/Grade/Grade";
import { useOverview, useOverviewCount } from "@/api/module";

function Summary() {
  const { data: overViewData } = useOverview();
  const { data: overviewCount } = useOverviewCount();

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.name}>架构质量评估</div>
          <div className={styles.date}>15Jul2020</div>
        </div>
        <BaButton>下载详细报告</BaButton>
      </div>

      <div className={styles.body}>
        <div className="chart">
          <QualityEvaluation data={overViewData} name="坏味道分布雷达" />
        </div>
        <div className={styles.detail}>
          <div className={styles.overview}>
            <BaLabel value={overviewCount?.repoCount} text="代码仓数"></BaLabel>
            <BaLabel value={overviewCount?.moduleCount} text="模块数"></BaLabel>
            <BaLabel value={overviewCount?.lineCount} text="总代码量"></BaLabel>
            <BaLabel value={overviewCount?.contributorCount} text="代码贡献人数"></BaLabel>
            <BuGrade text="架构质量等级" grade={overviewCount?.qualityLevel || "c"}></BuGrade>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
