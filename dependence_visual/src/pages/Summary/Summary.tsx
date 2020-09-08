import React, { useEffect, useState } from "react";
import styles from "./Summary.less";
import QualityEvaluation from "./components/QualityEvaluation";
import { getOverview, Overview } from "@/api/module/overview";
import { BaButton } from "@/components/Basic/Button/Button";
import { BaLabel } from "@/components/Basic/Label/Label";
import { BuGrade } from "@/components/Business/Grade/Grade";

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
        <BaButton>下载详细报告</BaButton>
      </div>

      <div className={styles.body}>
        <div className="chart">
          <QualityEvaluation data={summary} name="坏味道分布雷达" />
        </div>
        <div className={styles.detail}>
          <div className={styles.overview}>
            <BaLabel value="12" text="代码仓数"></BaLabel>
            <BaLabel value="148" text="模块数"></BaLabel>
            <BaLabel value="128,000" text="总代码量"></BaLabel>
            <BaLabel value="4" text="代码贡献人数"></BaLabel>
            <BuGrade text="架构质量等级" grade="c"></BuGrade>
          </div>
          {/* <p className="desc">
            从架构质量方面考虑，系统在代码规范、分层架构及数据库耦合等方面做得不错，但在测试保护、模块耦合方面阻碍较多，变更影响方面也有待提升。
          </p>
          <h3>重点提升点：</h3>
          <div className="point-list"></div> */}
        </div>
      </div>
    </div>
  );
}

export default Summary;
