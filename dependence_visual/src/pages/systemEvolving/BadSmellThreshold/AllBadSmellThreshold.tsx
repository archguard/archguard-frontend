import { AllBadSmellOption, useAllBadSmellOption } from "@/api/module/allBadSmellThresholds";
import { Collapse, Radio } from "antd";
import React from "react";
import BadSmellThresholdTable from "./components/BadSmellThresholdTable";

const AllBadSmellThreshold = () => {
  const renderRadio = (allBadSmellOption: AllBadSmellOption) => (
    <Radio
      value={allBadSmellOption.id}
      checked={allBadSmellOption.isDefault}
      onClick={(e) => e.stopPropagation()}
    >
      选择
    </Radio>
  );

  const { data } = useAllBadSmellOption();

  return (
    <div>
      <Collapse accordion ghost>
        {data &&
          data.map((allBadSmellOption) => {
            if (!allBadSmellOption) return null;
            return (
              <Collapse.Panel
                style={{ marginTop: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                header={allBadSmellOption.suiteName}
                extra={renderRadio(allBadSmellOption)}
                key={allBadSmellOption.id}
              >
                <BadSmellThresholdTable data={allBadSmellOption.thresholds}></BadSmellThresholdTable>
              </Collapse.Panel>
            );
          })}
      </Collapse>
    </div>
  );
};

AllBadSmellThreshold.defaultProps = {};

export default AllBadSmellThreshold;
