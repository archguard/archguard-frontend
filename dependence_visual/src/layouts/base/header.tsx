import React from "react";
import { Button } from "antd";
import { QuestionCircleOutlined, LoginOutlined } from "@ant-design/icons";
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
      <div style={{ display: "inline-block", float: "right" }}>
        {getFeature(FEATURES.INSIDE_FEATURE) && (
          <Button
            type="link"
            style={{color: "#ffffff"}}
            icon={<QuestionCircleOutlined />}
            onClick={() => props.history.push("/help")}
          >说明文档</Button>
          
        )}
        <Button
            type="link"
            style={{color: "#ffffff"}}
            icon={<LoginOutlined />}
            onClick={() => props.history.push("/login")}
          >登陆</Button>
      </div>
    </div>
  );
}
