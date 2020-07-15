import React from "react";
import { Button, notification } from "antd";
import { scanDependence } from "api/scanner/dependenceScanner";

// import "../../../mock/scanDependence";

export default function DependenceScanner() {
  const scan = () => {
    scanDependence().then((res) => {
      notification.success({
        message: "扫描成功！",
      });
    });
  };
  return (
    <Button onClick={scan}>依赖扫描</Button>
  );
}
