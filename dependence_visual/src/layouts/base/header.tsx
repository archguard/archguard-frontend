import React from "react";
import { Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

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
        <Button
          type="link"
          icon={<QuestionCircleOutlined />}
          onClick={() => props.history.push("/help")}
        ></Button>
      </div>
    </div>
  );
}
