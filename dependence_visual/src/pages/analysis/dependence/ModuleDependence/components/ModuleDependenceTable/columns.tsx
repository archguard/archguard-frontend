import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

type methodDependency = {
  caller: method;
  callee: method;
};

type method = {
  name: string;
  clazz: { module: string; name: string };
  argumentTypes: string[];
};

const classColumn = (dataIndex: String) => {
  const column = {
    title: "class",
    dataIndex: [dataIndex, "clazz", "name"],
    render: (text: string) => (
      <Tooltip title={text}>
        <Link
          to={{
            pathname: "/analysis/dependence/class",
            search: "className=" + text + "&dependenceType=dependencies",
          }}
        >
          {text.split(".").slice(-1)}
        </Link>
      </Tooltip>
    ),
  };
  return column;
};

const methodColumn = (dataIndex: String) => {
  const column = {
    title: "method",
    dataIndex: [dataIndex, "name"],
    render: (text: string, record: methodDependency) => {
      const method = dataIndex === "caller" ? record.caller : record.callee;
      return (
        <Link
          to={{
            pathname: "/analysis/dependence/method",
            search:
              "className=" +
              method.clazz.name +
              "&methodName=" +
              method.name +
              "&dependenceType=invokes",
          }}
        >
          {text}
        </Link>
      );
    },
  };
  return column;
};

const argumentColumn = (dataIndex: String) => {
  const column = {
    title: "argument",
    dataIndex: [dataIndex, "argumentTypes"],
    render: (text: string[]) => {
      return text.map((arg) => arg.split(".").slice(-1));
    },
  };
  return column;
};

const columns = [
  {
    title: "caller",
    children: [classColumn("caller"), methodColumn("caller"), argumentColumn("caller")],
  },
  {
    title: "callee",
    children: [classColumn("callee"), methodColumn("callee"), argumentColumn("callee")],
  },
];

export default columns;
