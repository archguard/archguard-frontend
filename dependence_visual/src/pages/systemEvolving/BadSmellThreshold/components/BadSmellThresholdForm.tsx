import { AllBadSmellOption, BadSmellOption, useAllBadSmellOption, useBadSmellOption } from '@/api/module/badSmellThresholds';
import { Collapse, Radio } from "antd";
import React from "react";
import BadSmellThresholdTable from './BadSmellThresholdTable';

const BadSmellThresholdForm = (props: { currentAction: string }) => {
  const { currentAction } = props;

  let data;
  if (currentAction === 'edit') {
    let dataBadSmellOption = useBadSmellOption()?.data;
    data = dataBadSmellOption;
  } else {
    let dataAllBadSmellOption = useAllBadSmellOption()?.data;
    data = dataAllBadSmellOption;
  }

  let renderRadio: any;
  if (currentAction === 'create') {
    renderRadio = (allBadSmellOption: AllBadSmellOption) => (
      <Radio
        value={allBadSmellOption.id}
        checked={allBadSmellOption.isDefault}
        onClick={(e) => e.stopPropagation()}
      >
        选择
      </Radio>
    );
  } else {
    renderRadio = (badSmellOption: BadSmellOption) => (
      <Radio
        value={badSmellOption.id}
        checked={badSmellOption.isDefault}
        onClick={(e) => e.stopPropagation()}
      >
        选择
      </Radio>
    );
  }

  return (
    <div>
      <Collapse accordion ghost>
        {data &&
          data.map((badSmellOption) => {
            if (!badSmellOption) return null;
            return (
              <Collapse.Panel
                style={{ marginTop: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
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

BadSmellThresholdForm.defaultProps = {};

export default BadSmellThresholdForm;
