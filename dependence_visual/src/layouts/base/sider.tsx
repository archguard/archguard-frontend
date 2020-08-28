import React from "react";
import { Menu } from "antd";
import { menuList } from "./config";
import { useMount } from 'ahooks';
import { storage } from '@/store/storage/sessionStorage'

export default function PageSider(props: any) {
  const projectId = storage.getProjectId()

  useMount(() => {
    if (projectId === null) {
      const id = props.location.pathname.split('/')[1]
      storage.setProjectId(id)
    }
  })

  const renderMenuItem = (item: any) => {
    if (!item) return;
    if (!item.children) {
      return (
        <Menu.Item key={`/${projectId}${item.key}`}>
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
        {item.children.map((subItem: any) => {
          return renderMenuItem(subItem);
        })}
      </Menu.SubMenu>
    );
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      onClick={(e) => props.history.push(e.key)}
      defaultOpenKeys={[props.location.pathname]}
      selectedKeys={[props.location.pathname]}
    >
      {menuList.map((item: any) => {
        return renderMenuItem(item);
      })}
    </Menu>
  );
}
