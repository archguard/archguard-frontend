import { Collapse, Radio } from "antd";
import React, { useState } from "react";
import styles from "./BadSmellThreshold.less";
import BadSmellThresholdTable from "./components/BadSmellThresholdTable";

const BadSmellThreshold = () => {
  const [level, setLevel] = useState(1);

  const renderRadio = (val: number | string) => (
    <Radio
      value={val}
      checked={val === level}
      onChange={(e) => setLevel(e.target.value)}
      onClick={(e) => e.stopPropagation()}
    >
      选择
    </Radio>
  );

  return (
    <div className={styles.BadSmellThreshold}>
      <div>请选择合适您系统的指标阈值：</div>
      <Collapse accordion ghost defaultActiveKey={level}>
        <Collapse.Panel
          className={styles.collapseItem}
          header="架构评估一级指标"
          extra={renderRadio(1)}
          key={1}
        >
          <BadSmellThresholdTable></BadSmellThresholdTable>
        </Collapse.Panel>
        <Collapse.Panel
          className={styles.collapseItem}
          header="架构评估二级指标"
          extra={renderRadio(2)}
          key={2}
        >
          <BadSmellThresholdTable></BadSmellThresholdTable>
        </Collapse.Panel>
        <Collapse.Panel
          className={styles.collapseItem}
          header="架构评估三级指标"
          extra={renderRadio(3)}
          key={3}
        >
          <BadSmellThresholdTable></BadSmellThresholdTable>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

BadSmellThreshold.defaultProps = {};

export default BadSmellThreshold;
