import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

export type methodDependency = {
  caller: method;
  callee: method;
};

type Clazz = {
  classType: string;
  fullName: string;
  interface: boolean;
  module: string;
  name: string;
  type: string;
};

type method = {
  name: string;
  fullname: string;
  clazz: Clazz;
  argumentTypes: string[];
  returnType: string;
};

const classColumn = (dataIndex: String) => {
  const column = {
    title: "class",
    dataIndex: [dataIndex, "clazz", "name"],
    render: (text: string, record: methodDependency) => {
      const method = dataIndex === "caller" ? record.caller : record.callee;
      return (
        <Tooltip title={text}>
          <Link
            to={{
              pathname: "/analysis/dependence/class",
              search:
                "className=" +
                text +
                "&dependenceType=dependencies" +
                "&module=" +
                method.clazz.module,
            }}
          >
            {text.split(".").slice(-1)}
          </Link>
        </Tooltip>
      );
    },
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
              "&dependenceType=invokes" +
              "&module=" +
              method.clazz.module,
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
