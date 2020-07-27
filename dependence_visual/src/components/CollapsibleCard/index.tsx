import React, { Fragment, useState, ReactNode } from "react";
import { Card, Button } from "antd";
import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";

interface CollapsibleCardProps {
  collapsed: boolean;
  title: string;
  size: "default" | "small" | undefined;
  extra: ReactNode;
  children: string;
}

const CollapsibleCard = (props: CollapsibleCardProps) => {
  const [collapsed, setCollapsed] = useState(props.collapsed)
  const [children] = useState(props.children)
  const [extra] = useState(props.extra)
  const [title] = useState(props.title)
  const [size] = useState(props.size)

  const onClick = () => {
    setCollapsed(!collapsed)
  }

  const titleTemplate = () => (
    <Fragment>
      <Button
        icon={collapsed ? <CaretRightOutlined /> : <CaretDownOutlined />}
        type="text"
        onClick={() => onClick()}
      />
      {title}
    </Fragment>
  );

  return (
    <div>
      <Card size={size} title={titleTemplate} extra={extra}>
        <div style={{ display: collapsed ? "none" : undefined }}>
          {children}
        </div>
      </Card>
    </div>
  );
}

export default CollapsibleCard;
