import { BadSmellOption, useBadSmellOption } from '@/api/module/badSmellThresholds';
import { Collapse, Radio } from "antd";
import React from "react";
import BadSmellThresholdTable from "./components/BadSmellThresholdTable";

const SingleBadSmellThreshold = () => {
  const renderRadio = (singleBadSmellOption: BadSmellOption) => (
    <Radio
      value={singleBadSmellOption.id}
      onClick={(e) => e.stopPropagation()}
    >
      选择
    </Radio>
  );

  const { data } = useBadSmellOption();

  return (
    <div>
      <Collapse accordion ghost>
        {data &&
          data.map((singleBadSmellOption) => {
            if (!singleBadSmellOption) return null;
            return (
              <Collapse.Panel
                style={{ marginTop: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                header={singleBadSmellOption.suiteName}
                extra={renderRadio(singleBadSmellOption)}
                key={singleBadSmellOption.id}
              >
                <BadSmellThresholdTable data={singleBadSmellOption.thresholds}></BadSmellThresholdTable>
              </Collapse.Panel>
            );
          })}
      </Collapse>
    </div>
  );
};

SingleBadSmellThreshold.defaultProps = {};

export default SingleBadSmellThreshold;
