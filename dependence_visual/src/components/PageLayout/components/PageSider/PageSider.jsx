import React from "react";
import { Menu } from "antd";
import { menuList } from "./config";

export default function PageSider(props) {
  const renderMenuItem = (item) => {
    if (!item) return;
    if (!item.children) {
      return (
        <Menu.Item key={item.key}>
          {item.icon}
          <span className="nav-text">{item.text}</span>
        </Menu.Item>
      );
    }

    return (
      <Menu.SubMenu
        key={item.key}
        title={
          <span>
            {item.icon}
            <span className="nav-text">{item.text}</span>
          </span>
        }
      >
        {item.children.map((subItem) => {
          return renderMenuItem(subItem);
        })}
      </Menu.SubMenu>
    );
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={(e) => props.history.push(e.key)}
      defaultOpenKeys={[props.location.pathname]}
      selectedKeys={[props.location.pathname]}
    >
      {menuList.map((item) => {
        return renderMenuItem(item);
      })}
    </Menu>
  );
}
