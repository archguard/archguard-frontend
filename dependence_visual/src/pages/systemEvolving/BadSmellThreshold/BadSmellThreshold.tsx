import { BadSmellOption, useBadSmellOption } from "@/api/module/badSmellThresholds";
import { Collapse, Radio } from "antd";
import React from "react";
import styles from "./BadSmellThreshold.less";
import BadSmellThresholdTable from "./components/BadSmellThresholdTable";

const BadSmellThreshold = () => {
  const renderRadio = (badSmellOption: BadSmellOption) => (
    <Radio
      checked={badSmellOption.isSelected}
      onClick={(e) => e.stopPropagation()}
      disabled={!badSmellOption.isSelected}
    >
      选择
    </Radio>
  );

  const { data } = useBadSmellOption();

  return (
    <div className={styles.BadSmellThreshold}>
      <div>请选择合适您系统的指标阈值：</div>
      <Collapse accordion ghost>
        {data &&
          data.map((badSmellOption) => {
            if (!badSmellOption) return null;
            return (
              <Collapse.Panel
                className={styles.collapseItem}
                header={badSmellOption.suiteName}
                extra={renderRadio(badSmellOption)}
                key={badSmellOption.id}
              >
                <BadSmellThresholdTable data={badSmellOption.thresholds}></BadSmellThresholdTable>
              </Collapse.Panel>
            );
          })}
      </Collapse>
    </div>
  );
};

BadSmellThreshold.defaultProps = {};

export default BadSmellThreshold;
