import React from "react";
import { Tooltip } from "antd";
import { Link } from "umi";
import { storage } from "@/store/storage/sessionStorage";
import { FlagFilled } from "@ant-design/icons";
import { ShotgunSurgeryClazz } from "@/pages/CohesionEvaluation/CohesionEvaluationIssuesList.config";

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

const classColumnRenderAsLinkByClazzes = (text: ShotgunSurgeryClazz[]) => {
  const systemId = storage.getSystemId();
  const getClassName = (clazz: ShotgunSurgeryClazz) => {
    return [clazz.packageName, clazz.typeName].join(".");
  };

  return (
    <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
      {text.map((clazz, index) => (
        <Tooltip title={`${clazz.moduleName}.${clazz.packageName}.${clazz.typeName}`}>
          <Link
            style={{ whiteSpace: "nowrap" }}
            className={index !== text.length - 1 ? "separate" : ""}
            to={{
              pathname: `/${systemId}/analysis/dependence/class`,
              search: `module=${clazz.moduleName}&className=${getClassName(
                clazz,
              )}&dependenceType=dependencies`,
            }}
            key={clazz.typeName}
          >
            {clazz.typeName}
          </Link>
        </Tooltip>
      ))}
    </div>
  );
};

export { classColumnRenderAsLink, classColumnRenderAsLinkByClazzes, methodColumnRenderAsLink };
