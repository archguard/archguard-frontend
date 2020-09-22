import * as _ from "lodash";
import React, { Fragment } from "react";
import { Tooltip } from "antd";
import { Link } from "umi";
import { storage } from "@/store/storage/sessionStorage";
import { FlagFilled } from "@ant-design/icons";
import { ShotgunSurgeryClazz } from "@/pages/CohesionEvaluation/CohesionEvaluationIssuesList.config";

interface IssuesListRowData {
  id?: string;
  moduleName?: string;
  packageName?: string;
  typeName?: string;
  className?: string;
  methodName?: string;
}

const hotFiles = storage.getHotFiles();

const getSeparateClassName = (index: number, length: number): string => {
  return index !== length - 1 ? "separate" : "";
};

const getPathArray = (data: IssuesListRowData) => {
  return [
    data.moduleName,
    data.packageName,
    data.typeName || data.className,
    data.methodName,
  ].filter((text) => text);
};

const getFullPath = (data: IssuesListRowData) => {
  return getPathArray(data).join(".");
};

const getLinkTo = (data: IssuesListRowData, type: "class" | "method") => {
  const pathname = `/${storage.getSystemId()}/analysis/dependence/${type}`;
  const className = data.typeName || data.className;
  const moduleSearch = `module=${data.moduleName}`;
  const classSearch = `className=${data.packageName}.${className}`;
  const methodSearch = type === "method" ? `methodName=${data.methodName}` : "";
  const dependenceTypeSearch = "dependenceType=dependencies";

  const search = [moduleSearch, classSearch, methodSearch, dependenceTypeSearch]
    .filter((str) => str)
    .join("&");

  return {
    pathname,
    search,
  };
};

const renderHotFiles = (record: IssuesListRowData) => {
  if (!hotFiles.includes(record.id!)) return null;

  return (
    <span className="red">
      <FlagFilled style={{ marginLeft: 5 }} />
    </span>
  );
};

const classColumnRenderAsLink = (text: string, record: IssuesListRowData) => {
  return (
    <Tooltip title={text}>
      <div style={{ display: "inline-block" }}>
        <Link style={{ whiteSpace: "nowrap" }} to={getLinkTo(record, "class")}>
          {text}
        </Link>
        {renderHotFiles(record)}
      </div>
    </Tooltip>
  );
};

const methodColumnRenderAsLink = (text: string, record: IssuesListRowData) => {
  return (
    <Tooltip title={text}>
      <Link to={getLinkTo(record, "method")}>{text}</Link>
    </Tooltip>
  );
};

const classColumnRenderAsLinkByClazzes = (text: ShotgunSurgeryClazz[]) => {
  return (
    <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
      {text.map((clazz, index) => (
        <Tooltip title={getFullPath(clazz)}>
          <Link
            style={{ whiteSpace: "nowrap" }}
            className={getSeparateClassName(index, text.length)}
            to={getLinkTo(clazz, "class")}
            key={clazz.typeName}
          >
            {clazz.typeName}
          </Link>
        </Tooltip>
      ))}
    </div>
  );
};

const circularDependencyColumnRender = (rowDatas: IssuesListRowData[]) => {
  return rowDatas.map((data, index) => {
    const pathNames = getPathArray(data);
    const separateClass = getSeparateClassName(index, rowDatas.length);
    const isClass = pathNames.length === 3;
    const isMethod = pathNames.length === 4;
    const text = _.last(pathNames)!;

    return (
      <Fragment>
        {isClass ? (
          classColumnRenderAsLink(text, data)
        ) : isMethod ? (
          methodColumnRenderAsLink(text, data)
        ) : (
          <Tooltip title={getFullPath(data)}>
            <span>{text}</span>
          </Tooltip>
        )}
        <span className={separateClass}></span>
      </Fragment>
    );
  });
};

export {
  classColumnRenderAsLink,
  classColumnRenderAsLinkByClazzes,
  methodColumnRenderAsLink,
  circularDependencyColumnRender,
};
