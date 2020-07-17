import React from "react";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "callerClass",
    dataIndex: "callerClass",
    key: "callerClass",
    render: (text: string) => (
      <Link
        to={{
          pathname: "/analysis/dependence/class",
          search: "className=" + text + "&dependenceType=dependences",
        }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: "callerMethod",
    dataIndex: "callerMethod",
    key: "callerMethod",
    render: (text: string, record: { callerClass: string; callerMethod: string }) => (
      <Link
        to={{
          pathname: "/analysis/dependence/method",
          search:
            "className=" +
            record.callerClass +
            "&methodName=" +
            record.callerMethod +
            "&dependenceType=invokes",
        }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: "calleeClass",
    dataIndex: "calleeClass",
    key: "calleeClass",
    render: (text: string) => (
      <Link
        to={{
          pathname: "/analysis/dependence/class",
          search: "className=" + text + "&dependenceType=dependences",
        }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: "calleeMethod",
    dataIndex: "calleeMethod",
    key: "calleeMethod",
    render: (text: string, record: { calleeClass: string; calleeMethod: string }) => (
      <Link
        to={{
          pathname: "/analysis/dependence/method",
          search:
            "className=" +
            record.calleeClass +
            "&methodName=" +
            record.calleeMethod +
            "&dependenceType=invokes",
        }}
      >
        {text}
      </Link>
    ),
  },
];

export default columns;
