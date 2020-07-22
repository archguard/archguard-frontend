import { checkEvaluationState, createEvaluation } from "@/api/scanner/evaluations";
import { transformColorToRGBA } from "@/utils/transformColor";
import ExceptionOutlined from "@ant-design/icons/ExceptionOutlined";
import { Col, Divider, notification, Row, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { EvaluationContentItemType } from "./data";
import "./item.less";

interface EvaluationItemProps {
  item: EvaluationContentItemType;
  color: string;
}

export default function EvaluationItem(props: EvaluationItemProps) {
  const { item, color } = props;
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    if (!item.type) return;
    checkEvaluationState(item.type).then((res) => {
      setRunning(res.isRunning);
    });
  }, [item]);

  function onCreateEvaluationClick(type?: string) {
    if (!type) {
      notification.warning({ message: "此评估暂不可用！" });
      return;
    }
    createEvaluation(type).then((res) => {
      if (res.isRunning === true) {
        notification.info({ message: "正在评估中..." });
        setRunning(true);
      }
    });
  }

  function onCheckEvaluationStateClick(type?: string) {
    if (!type) return;
    checkEvaluationState(type).then((res) => {
      const isRunning = res.isRunning;
      setRunning(isRunning);
      if (isRunning) {
        notification.info({ message: "正在评估中..." });
      } else {
        notification.success({ message: "评估完成！" });
      }
    });
  }

  return (
    <div
      className="evaluation-item"
      style={{
        borderColor: color,
        backgroundColor: transformColorToRGBA(color, 0.08),
      }}
    >
      <Row align="middle" style={{ height: "100%" }}>
        <Col span={4}>
          <h2>{item.title}</h2>
        </Col>
        <Col span={2}>
          <Divider type="vertical" style={{ height: "64px" }}></Divider>
        </Col>
        <Col span={16}>
          <p>{item.detail}</p>
        </Col>
        <Col span={2}>
          {isRunning ? (
            <Tooltip title="查看评估状态">
              <ExceptionOutlined
                spin
                style={{ fontSize: "32px" }}
                onClick={() => onCheckEvaluationStateClick(item.type)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="开始评估">
              <ExceptionOutlined
                style={{ fontSize: "32px" }}
                onClick={() => onCreateEvaluationClick(item.type)}
              />
            </Tooltip>
          )}
        </Col>
      </Row>
    </div>
  );
}
