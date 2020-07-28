import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

const classColumn = (dataIndex: String) => {
  const column = {
    title: "class",
    dataIndex: [dataIndex, "clazz", "name"],
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
  };
  return column;
};

const methodColumn = (dataIndex: String) => {
  const column = {
    title: "method",
    dataIndex: [dataIndex, "name"],
    render: (text: string, record: { [x: string]: { [x: string]: string } }) => {
      const method = dataIndex === "caller" ? record.caller : record.callee;
      return (
        <Tooltip
          title={
            <div>
              <b>argument:</b>
              <p>{method.argumentTypes}</p>
              <b>returnType:</b>
              <p>{method.returnType}</p>
            </div>
          }
        >
          <Link
            to={{
              pathname: "/analysis/dependence/method",
              search:
                "className=" +
                method.className +
                "&methodName=" +
                method.name +
                "&dependenceType=invokes",
            }}
          >
            {text}
          </Link>
        </Tooltip>
      );
    },
  };
  return column;
};

const columns = [
  {
    title: "caller",
    children: [classColumn("caller"), methodColumn("caller")],
  },
  {
    title: "callee",
    children: [classColumn("callee"), methodColumn("callee")],
  },
];

export default columns;
