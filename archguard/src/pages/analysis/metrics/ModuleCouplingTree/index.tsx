import React, { useState, useEffect } from "react";
import Report from "./report";
import useCodeTree from "@/store/global-cache-state/useCodeTree";
import { expandCodeTree } from "@/utils/utils";
import { Select } from "antd";
import useQualityGate from "@/store/global-cache-state/useQualityGate";
import { Profile } from "@/types/metrics/Metrics";

function ModuleCouplingTable() {
  const [codeTree] = useCodeTree();

  const [qualityGateProfile, setQualityGateProfile] = useState<Profile[]>([]);
  const [currentGateProfile, setCurrentGateProfile] = useState<Profile | undefined>();
  const [nodeTree, setNodeTree] = useState<SubModuleNode[]>([]);

  const [qualityGate] = useQualityGate();

  const { Option } = Select;

  function showAllModuleCoupling() {
    const tree = codeTree?.value!;

    const expandTree = expandCodeTree(tree);

    setNodeTree(expandTree);
  }

  useEffect(() => {
    showAllModuleCoupling();
  }, [codeTree]);

  useEffect(() => {
    setQualityGateProfile(qualityGate?.value || []);
  }, [qualityGate]);

  const qualityGateChange = (value: number) => {
    if (value) {
      const profile = qualityGateProfile.find((x) => x.id === value);
      setCurrentGateProfile(profile);
    } else {
      setCurrentGateProfile(undefined);
    }
  };

  return (
    <div>
      <Select
        showSearch
        allowClear
        style={{ width: 200, marginBottom: 15 }}
        placeholder="请选择质量域"
        optionFilterProp="children"
        onChange={qualityGateChange}
      >
        {qualityGateProfile?.map((q) => {
          return (
            <Option key={q.id} value={q.id!}>
              {q.name}
            </Option>
          );
        })}
      </Select>
      {nodeTree!.length > 0 && <Report nodes={nodeTree!} qualityGate={currentGateProfile} />}
    </div>
  );
}

export default ModuleCouplingTable;
