import React from "react";
import { Select } from "antd";
import { storage } from "@/store/storage/sessionStorage";
import { queryHotFiles } from "@/api/module/gitFile";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { history } from "umi";
import { useMount } from "react-use";

export enum FEATURES {
  CODE_SCANNER = "CODE_SCANNER",
  INSIDE_FEATURE = "INSIDE_FEATURE",
}

export type FeatureType = keyof typeof FEATURES;

export const config: {
  features: {
    [key in FeatureType]: { [key: string]: boolean };
  };
} = {
  features: {
    CODE_SCANNER: {
      zh: false,
      default: true,
    },
    INSIDE_FEATURE: {
      zh: false,
    },
  },
};

const BUILD_TARGET = process.env.BUILD_TARGET || "default";

export function getFeature(name: FeatureType) {
  const feature = config.features[name];
  const featureEnabled = feature[BUILD_TARGET];
  return featureEnabled !== undefined ? featureEnabled : true;
}

export default function SubSystemHeader(props: any) {
  const [systemInfo] = useSystemList();
  const currentSystemId = Number(storage.getSystemId());

  useMount(() => {
    queryHotFiles().then((res) => {
      storage.setHotFiles(res);
    });
  });

  const onSystemChange = (systemId: number) => {
    if (systemId) {
      storage.setSystemId(systemId);
      const pathArray = window.location.pathname.split("/");
      pathArray[1] = systemId.toString();
      window.location.href = pathArray.join("/");
    } else {
      history.push("/home");
    }
  };

  return (
    <div>
      <div style={{float: "left"}}>
        <span
          title="点击返回系统选择页面"
          style={{
            marginLeft: "24px",
            color: "#ffffff",
            fontWeight: 800,
            cursor: "pointer",
          }}
          onClick={() => {
            history.push("/home");
          }}
        >
          Home
        </span>
        <span style={{marginLeft: 15, color: "white", userSelect: "none"}}>丨</span>
        <Select
          defaultValue={currentSystemId!}
          style={{width: 150, color: "#fff"}}
          bordered={false}
          showArrow={false}
          onChange={(value) => onSystemChange(value)}
        >
          <Select.OptGroup label="点击切换系统">
            {systemInfo?.value!.map((system, index) => (
              <Select.Option
                disabled={system.scanned !== "SCANNED"}
                value={system.id}
                key={`${system.systemName}_${index}`}
              >
                {system.systemName}
              </Select.Option>
            ))}
          </Select.OptGroup>
          <Select.OptGroup label="点击返回">
            <Select.Option value={0} key={0}>
              返回选择页面
            </Select.Option>
          </Select.OptGroup>
        </Select>
      </div>
    </div>
  );
}
