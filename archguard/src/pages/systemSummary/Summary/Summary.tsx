import React, { useEffect, useState } from "react";
import styles from "./Summary.less";
import QualityEvaluation from "./components/QualityEvaluation";
import { BaButton } from "@/components/Basic/Button/Button";
import { BaLabel } from "@/components/Basic/Label/Label";
import { BuGrade } from "@/components/Business/Grade/Grade";
import { useOverview, useOverviewCount } from "@/api/module/codeLine";
import { history } from "umi";
import { storage } from "@/store/storage/sessionStorage";
import useSystemList from "@/store/global-cache-state/useSystemList";
import GitChanges from "@/pages/systemSummary/Summary/components/GitChanges";

function Summary() {
  const { data: overViewData } = useOverview();
  const { data: overviewCount } = useOverviewCount();
  const [systemList] = useSystemList();
  const [systemName, setSystemName] = useState<string>("");

  const getSystemName = (): string => {
    const list = systemList?.value || [];
    const id = storage.getSystemId();

    return list.find((system) => system.id == parseInt(id))?.systemName || "";
  };

  useEffect(() => {
    setSystemName(getSystemName());
  }, [systemList]);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.name}>{systemName}</div>
        </div>
        <BaButton
          onClick={() => history.push(`/${storage.getSystemId()}/systemEvolving/MeasureIndicators`)}
        >
          查看指标看板
        </BaButton>
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
            <BuGrade text="架构质量等级" grade={overviewCount?.qualityLevel}></BuGrade>
          </div>
        </div>
        {/*<GitChanges />*/}
      </div>
    </div>
  );
}

export default Summary;
