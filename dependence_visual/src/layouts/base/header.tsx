import React from "react";
import { Button, Select } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FEATURES, getFeature } from "@/config/buildTargets";
import { storage } from "@/store/storage/sessionStorage";
import { queryHotFiles } from "@/api/scanner/hotFile";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { useMount } from "ahooks";

export default function PageHeader(props: any) {
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
      props.history.push("/multiple-system");
    }
  };

  return (
    <div>
      <div style={{ float: "left" }}>
        <span
          style={{
            marginLeft: "24px",
            color: "#ffffff",
            fontStyle: "italic",
            fontSize: "20px",
            fontWeight: 800,
          }}
        >
          ArchGuard
        </span>
        <span style={{ marginLeft: 15, color: "white", userSelect: "none" }}>丨</span>
        <Select
          defaultValue={currentSystemId!}
          style={{ width: 150, color: "#fff" }}
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
      <div style={{ display: "inline-block", float: "right" }}>
        {getFeature(FEATURES.INSIDE_FEATURE) && (
          <Button
            type="link"
            style={{ color: "#ffffff" }}
            icon={<QuestionCircleOutlined />}
            onClick={() => props.history.push(`/${currentSystemId}/help`)}
          >
            说明文档
          </Button>
        )}
        {/* <Button
            type="link"
            style={{color: "#ffffff"}}
            icon={<LoginOutlined />}
            onClick={() => props.history.push("/login")}
          >登录</Button> */}
      </div>
    </div>
  );
}
