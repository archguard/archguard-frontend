import React from "react";
import { Divider, Row, Col, Tooltip, notification } from "antd";
import ExceptionOutlined from "@ant-design/icons/ExceptionOutlined";

import {
  createEvaluation,
  checkEvaluationState,
} from "api/scanner/evaluations";

import { transformColorToRGBA } from "utils/transformColor";

import "./EvaluationItem.css";

export default class EvaluationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
    };
  }

  componentDidMount() {
    const type = this.props.item.type;
    if (!type) return;
    checkEvaluationState({ type }).then((res) => {
      this.setState({ isRunning: res.isRunning });
    });
  }

  onCreateEvaluationClick(type) {
    if (!type) {
      notification.warning({message: "此评估暂不可用！"})
      return;
    }
    createEvaluation({ type }).then((res) => {
      if (res.isRunning === true) {
        notification.info({ message: "正在评估中..." });
        this.setState({ isRunning: true });
      }
    });
  }

  onCheckEvaluationStateClick(type) {
    if (!type) return;
    checkEvaluationState({ type }).then((res) => {
      const isRunning = res.isRunning;
      this.setState({ isRunning });
      if (isRunning) {
        notification.info({ message: "正在评估中..." });
      } else {
        notification.success({ message: "评估完成！" });
      }
    });
  }

  render() {
    const color = this.props.color;
    const item = this.props.item;
    const isRunning = this.state.isRunning;
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
                  onClick={() => this.onCheckEvaluationStateClick(item.type)}
                />
              </Tooltip>
            ) : (
              <Tooltip title="开始评估">
                <ExceptionOutlined
                  style={{ fontSize: "32px" }}
                  onClick={() => this.onCreateEvaluationClick(item.type)}
                />
              </Tooltip>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
