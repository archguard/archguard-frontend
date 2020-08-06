import React from "react";
import { Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FEATURES, getFeature } from "@/config/buildTargets";

export default function PageHeader(props) {
  return (
    <div>
      <span
        style={{
          marginLeft: "24px",
          color: "#ffffff",
          fontStyle: "italic",
          fontSize: "20px",
          fontWeight: "800",
        }}
      >
        ArchGuard
      </span>
      <div style={{ display: "inline-block	", float: "right" }}>
        {getFeature(FEATURES.INSIDE_FEATURE) && (
          <Button
            type="link"
            icon={<QuestionCircleOutlined />}
            onClick={() => props.history.push("/help")}
          ></Button>
        )}
      </div>
    </div>
  );
}
