import React from "react";
import { Card, Button, Dropdown, Menu } from "antd";
import Meta from "antd/lib/card/Meta";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { SystemInfo } from "@/api/addition/systemInfo";
import { useIntl } from "@@/plugin-locale/localeExports";

interface SystemCardProps {
  systemInfo?: SystemInfo;
  onCreate?(): void;
  onEdit?(): void;
  onRemove?(): void;
  onScanning?(): void;
  onCancel?(): void;
  viewLog?(): void;
}

const SystemCard = (props: SystemCardProps) => {
  const { formatMessage } = useIntl();
  const { systemInfo, onCreate, onScanning, onEdit, onRemove, onCancel, viewLog } = props;

  const menuClick = (key: string) => {
    switch (key) {
      case "reScanning":
        onScanning!();
        break;
      case "editSystemInfo":
        onEdit!();
        break;
      case "viewLog":
        viewLog!();
        break;
      case "removeSystem":
        onRemove!();
        break;
      case "cancelScan":
        onCancel!();
        break;
    }
  };

  const menu = (
    <Menu onClick={({ key }) => menuClick(key as string)}>
      { systemInfo && systemInfo.scanned === "SCANNING" &&
        <Menu.Item key="cancelScan">{formatMessage({ id: 'CANCEL_SCAN'})}</Menu.Item>
      }
      {
        systemInfo && systemInfo.scanned !== "SCANNING" &&
        <>
          <Menu.Item key="reScanning">{formatMessage({ id: 'RE_SCAN'})}</Menu.Item>
          <Menu.Item key="viewLog">{formatMessage({ id: 'VIEW_LOG'})}</Menu.Item>
          <Menu.Item key="editSystemInfo">{formatMessage({ id: 'MODIFY_SYSTEM'})}</Menu.Item>
          <Menu.Item danger key="removeSystem">{formatMessage({ id: 'DELETE_SYSTEM'})}</Menu.Item>
        </>
      }
    </Menu>
  );

  const renderSystemButton = (systemInfo: SystemInfo) => {
    const { scanned } = systemInfo;
    const onScannedClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onScanning!();
      return event.stopPropagation();
    };

    switch (scanned) {
      case "SCANNED":
        return <Button type="primary" onClick={ onCreate }>
          { formatMessage({ id: 'ENTER' }) }
        </Button>
      case "FAILED":
        return <Button danger type="primary" onClick={ onScannedClick }>
          { formatMessage({ id: 'SCAN_FAILURE_RETRY' }) }
        </Button>
      case "SCANNING":
        return <Button type="primary" loading>
          { formatMessage({ id: 'SCANNING' }) }
        </Button>
      default:
        return <Button type="primary" onClick={ onScannedClick }>
          { formatMessage({ id: 'SCAN' }) }
        </Button>
    }
  };

  function getDescription(systemInfo: SystemInfo) {
    let time = new Date(systemInfo.updatedTime ).toISOString();
    return `${ formatMessage({ id: 'LAST_SCAN_TIME' }) }: ${ time}`;
  }

  return systemInfo ? (
    <Card hoverable className="multiple-system-card">
      <div className="multiple-system-card-content">
        <Dropdown
          overlay={menu}
          placement="bottomLeft"
          className="more"
          trigger={["click"]}
        >
          <Button size="small" shape="circle" icon={<EllipsisOutlined />}></Button>
        </Dropdown>
        <img
          style={{ margin: "30px 0", width: "180px" }}
          src={require("@/assets/images/evolveLogo.png")}
          alt="example"
        />
        <div className="card-btn">{renderSystemButton(systemInfo)}</div>
      </div>
      <div className="multiple-system-card-title">
        <Meta title={systemInfo.systemName} description={getDescription(systemInfo)} />
      </div>
    </Card>
  ) : (
      <Card hoverable className="multiple-system-card" onClick={onCreate}>
        <div className="multiple-system-card-content add">
          <PlusOutlined/>
        </div>
        <div className="multiple-system-card-title add">
          <span>{ formatMessage({ id: 'NEW_SYSTEM' }) }</span>
        </div>
      </Card>
    );
};

export default SystemCard;
