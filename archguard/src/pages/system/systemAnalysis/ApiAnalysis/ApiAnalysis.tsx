import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useIntl } from "@@/plugin-locale/localeExports";
import ApiResourceTree from "@/pages/system/systemSummary/Summary/components/ApiResourceTree";
import { queryContainerServices } from "@/api/module/containerService";
import { useParams } from "umi";
import { storage } from "@/store/storage/sessionStorage";
import styles from "./ApiAnalysis.less";

const ApiAnalysis = () => {
  const { formatMessage } = useIntl();
  const [services, setServices] = useState({} as any);

  const { systemId } = useParams();
  storage.setSystemId(systemId)

  useEffect(() => {
    queryContainerServices(systemId).then((res) => {
      setServices(res);
    });
  }, []);

  const sortFunc = (type: String) => (a, b) => a[type].length - b[type].length;

  const demandColumns = [
    {
      title: "Source Method",
      dataIndex: "sourceMethod",
      key: "sourceMethod",
      sorter: sortFunc("sourceMethod"),
    },
    { title: "URI", dataIndex: "targetUrl", key: "targetUrl", sorter: sortFunc("targetUrl") },
    {
      title: "HTTP Method",
      dataIndex: "targetHttpMethod",
      key: "targetHttpMethod",
      sorter: sortFunc("targetHttpMethod"),
    },
  ];

  const supplyColumns = [
    {
      title: "package",
      dataIndex: "packageName",
      key: "packageName",
      sorter: sortFunc("packageName"),
    },
    { title: "class", dataIndex: "className", key: "className", sorter: sortFunc("className") },
    { title: "method", dataIndex: "methodName", key: "methodName", sorter: sortFunc("methodName") },
    {
      title: "Http Method",
      dataIndex: "sourceHttpMethod",
      key: "sourceHttpMethod",
      sorter: sortFunc("sourceHttpMethod"),
    },
    { title: "sourceUrl", dataIndex: "sourceUrl", key: "sourceUrl", sorter: sortFunc("sourceUrl") },
  ];

  return (
    <div>
      <div className={styles.physical}>
        <div className={styles.demand}>
          <h2>
            {formatMessage({ id: "SYSTEM_OVERVIEW.API_DEMAND_LIST" })} (
            {services["demands"]?.length})
          </h2>
          <Table dataSource={services["demands"]} columns={demandColumns} />
        </div>
        {services["resources"]?.length > 0 && (
          <div className={styles.resource}>
            <h2>
              {formatMessage({ id: "SYSTEM_OVERVIEW.API_RESOURCE_LIST" })} (
              {services["resources"]?.length})
            </h2>
            <Table dataSource={services["resources"]} columns={supplyColumns} />
            <ApiResourceTree dataSource={services["resources"]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiAnalysis;
