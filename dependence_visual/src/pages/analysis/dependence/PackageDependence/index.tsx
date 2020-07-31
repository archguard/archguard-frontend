import { queryPackageDependencies } from "@/api/module/package";
import FullscreenContainer from "@/components/fullscreen-container";
import { Button, Col, Row, Select } from "antd";
import React, { useMemo, useRef, useState } from "react";
import { useAsync } from "react-use";
import "./index.css";
import PackageGraph from "./components/PackageGraph";

export default function PackageDependence() {
  const { value: allDependence = [] } = useAsync(queryPackageDependencies);
  const [currentModule, setCurrentModule] = useState(0);
  const graph = useRef<any>(null);

  const currentGraphData = useMemo(() => {
    if (allDependence[currentModule]) {
      return allDependence[currentModule].packageGraph;
    }
  }, [allDependence, currentModule]);

  const onCollapseAll = () => {
    if (graph.current) {
      graph.current.collapseAll();
    }
  };

  const onExpandAll = () => {
    console.log("dsgs");
    if (graph.current) {
      graph.current.expandAll();
    }
  };

  return (
    <div className="package-container">
      <Row gutter={18} align="middle" style={{ marginBottom: "8px" }}>
        <Col span={2}>
          <span>所属模块：</span>
        </Col>
        <Col span={6}>
          <Select
            placeholder="请选择"
            value={currentModule}
            onChange={setCurrentModule}
            style={{ width: "100%" }}
            showSearch={true}
          >
            {allDependence
              .map((it: any) => it.module)
              .map((module: any, index: number) => {
                return (
                  <Select.Option value={index} key={module}>
                    {module}
                  </Select.Option>
                );
              })}
          </Select>
        </Col>
        <Col span={16}>
          <Button onClick={onCollapseAll}>全部收起</Button>
          <Button style={{ marginLeft: 16 }} onClick={onExpandAll}>
            全部展开
          </Button>
        </Col>
      </Row>
      <FullscreenContainer style={{ height: 600, border: "1px solid #f4f4f4" }}>
        <PackageGraph ref={graph} data={currentGraphData} />
      </FullscreenContainer>
    </div>
  );
}
