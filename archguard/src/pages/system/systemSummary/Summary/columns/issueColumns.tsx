import React, { useEffect, useState } from "react";
import {
  ClockCircleOutlined,
  DownCircleOutlined,
  ExclamationCircleOutlined,
  UpCircleOutlined
} from "@ant-design/icons";
import { IssuePosition } from "@/api/module/issue";

export const breakRender = (text, record) => (
  <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
    {text}
  </div>
);

export const issueColumns = [
  {
    title: "severity",
    dataIndex: "severity",
    width: 50,
    key: "severity",
    filters: [
      {
        text: "HINT",
        value: "HINT",
      },
      {
        text: "WARN",
        value: "WARN",
      },
      {
        text: "INFO",
        value: "INFO",
      },
      {
        text: "BLOCKER",
        value: "BLOCKER",
      },
    ],
    onFilter: (value: string, record) => record.severity.indexOf(value) === 0,
    sorter: (a, b) => a.severity.length - b.severity.length,
    render: (text, record) => {
      switch (text) {
        case "HINT":
          return <ClockCircleOutlined style={{ fontSize: "24px", color: "#08c" }} />;
        case "WARN":
          return <UpCircleOutlined style={{ fontSize: "24px", color: "#c0c0c0" }} />;
        case "INFO":
          return <DownCircleOutlined style={{ fontSize: "24px", color: "#0f0" }} />;
        case "BLOCKER":
          return <ExclamationCircleOutlined style={{ fontSize: "24px", color: "#f00" }} />;
        default:
          return "";
      }
    },
  },
  { title: "name", dataIndex: "name", key: "name" },
  { title: "detail", dataIndex: "detail", key: "detail", width: 300, render: breakRender },
  { title: "fullName", dataIndex: "fullName", key: "fullName", width: 200, render: breakRender },
  { title: "ruleId", dataIndex: "ruleId", key: "ruleId", width: 300, render: breakRender },
  { title: "source", dataIndex: "source", key: "source", render: breakRender },
  {
    title: "position",
    dataIndex: "position",
    key: "position",
    width: 50,
    render: (text, record) => {
      if (!text || text == "{}") return "";

      let pos: IssuePosition = JSON.parse(text);
      return `${pos.startLine}:${pos.startColumn}-${pos.endLine}:${pos.endColumn}`;
    },
  },
];

