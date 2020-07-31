import React, { Fragment, useState, ReactNode, ReactChildren } from "react";
import { Card, Button } from "antd";
import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";

interface CollapsibleCardProps {
  collapsed?: boolean;
  title?: string | ReactNode;
  size?: "default" | "small" | undefined;
  extra?: ReactNode;
  children?: any;
  className?: string;
}

const CollapsibleCard = (props: CollapsibleCardProps) => {
  const [collapsed, setCollapsed] = useState(props.collapsed)

  const onClick = () => {
    setCollapsed(!collapsed)
  }

  const titleTemplate = (
    <Fragment>
      <Button
        icon={collapsed ? <CaretRightOutlined /> : <CaretDownOutlined />}
        type="text"
        onClick={() => onClick()}
      />
      {props.title}
    </Fragment>
  );

  return (
    <div>
      <Card size={props.size} title={titleTemplate} extra={props.extra}>
        <div style={{ display: collapsed ? "none" : undefined }}>
          {props.children}
        </div>
      </Card>
    </div>
  );
}

export default CollapsibleCard;
