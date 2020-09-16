import React from "react";
import { Tooltip } from "antd";
import { Link } from "umi";
import { storage } from "@/store/storage/sessionStorage";
import { FlagFilled } from "@ant-design/icons";

const hotFiles = storage.getHotFiles();

const classColumnRenderAsLink = (text: string, record: any) => {
  const module = record.moduleName;
  const className = [record.packageName, record.typeName].join(".");

  return (
    <Tooltip title={text}>
      <div style={{ whiteSpace: "nowrap" }}>
        <Link
          to={{
            pathname: `/${storage.getSystemId()}/analysis/dependence/class`,
            search: `module=${module}&className=${className}&dependenceType=dependencies`,
          }}
        >
          {text}
        </Link>
        {hotFiles.includes(record.id) && (
          <span className="red">
            <FlagFilled style={{ marginLeft: 5 }} />
          </span>
        )}
      </div>
    </Tooltip>
  );
};

const methodColumnRenderAsLink = (text: string, record: any) => {
  const module = record.moduleName;
  const className = [record.packageName, record.typeName].join(".");
  const methodName = record.methodName;

  return (
    <Tooltip title={text}>
      <Link
        to={{
          pathname: `/${storage.getSystemId()}/analysis/dependence/method`,
          search: `module=${module}&className=${className}&methodName=${methodName}&dependenceType=invokes`,
        }}
      >
        {text}
      </Link>
    </Tooltip>
  );
};

export { classColumnRenderAsLink, methodColumnRenderAsLink };
