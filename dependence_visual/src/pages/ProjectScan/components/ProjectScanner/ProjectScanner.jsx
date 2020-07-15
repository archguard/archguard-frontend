import React from "react";
import { Button, notification } from "antd";
import { scanProject } from "api/scanner/projectScanner";

// import "../../../../mock/scanner";

export default class ProjectScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false
    };
  }

  onScanClick() {
    scanProject().then(res => {
      const running = res.isRunning;
      this.setState({ running });
      if (running) {
        notification.info({
          message: "正在扫描中..."
        });
      } else {
        notification.success({
          message: "扫描成功！"
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={() => this.onScanClick()}
        >
          {this.state.running ? "查看扫描状态" : "扫描"}
        </Button>
      </div>
    );
  }
}
