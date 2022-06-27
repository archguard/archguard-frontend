import React, { useCallback, useState } from "react";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { Select, Table } from "antd";
import { storage } from "@/store/storage/sessionStorage";
import { queryDatamap } from "@/api/datamap/datamap";
import { useParams } from "umi";
import { useIntl } from "@@/plugin-locale/localeExports";
import DatamapSankey from "@/pages/databaseMap/components/DatamapSankey";
import { ColumnsType } from "antd/lib/table/interface";

const DatabaseMap = () => {
  const { formatMessage } = useIntl();
  const [systemInfo] = useSystemList();
  const [isInChanging, setIsInChanging] = useState(false);
  // @ts-ignore
  const [systemId, setSystemId] = useState(useParams().systemId);
  const [dbRecords, setDbRecords] = useState([]);

  const onSystemChange = useCallback((index: number) => {
    setIsInChanging(false)
    let system = systemInfo?.value!.filter((item) => item.id === index)[0]
    if (system) {
      storage.setSystemId(system.id);
      storage.setSystemLanguage(system.language);

      setSystemId(system.id)

      queryDatamap(system.id).then((res) => {
        setDbRecords(res)
        setIsInChanging(true);
      })
    }
  }, [setIsInChanging, setDbRecords]);

  const sortFunc = (type: string) => {
    return (a, b) => a[type].length - b[type].length;
  }

  const unmapColumns: ColumnsType['columns'] = [
    { title: "packageName", key: "packageName", dataIndex: "packageName",  sorter: sortFunc("packageName") },
    { title: "className", key: "className", dataIndex: "className", sorter: sortFunc("className") },
    { title: "functionName", key: "functionName", dataIndex: "functionName", sorter: sortFunc("functionName") },
    { title: "tables", key: "tables", dataIndex: "tables", sorter: sortFunc("tables") },
  ];

  return (
    <div>
      {systemInfo?.value && (
        <div>
          <div>
            <p>
              {formatMessage({ id: "DATABASE_MAP_TIPS" })} <br />
              {formatMessage({ id: "ADD_NEW_FRAMEWORK" })}
              <a href="https://github.com/archguard/archguard" target={"_blank"} rel="noreferrer">
                https://github.com/archguard/archguard
              </a>
            </p>
          </div>
          <Select
            style={{ width: 350, color: "#000" }}
            bordered={true}
            showArrow={true}
            placeholder={formatMessage({ id: "SELECT_SYSTEM" })}
            onChange={(index) => onSystemChange(index)}
            options={
              systemInfo?.value!.map((item) => ({
                disabled: item.scanned !== "SCANNED",
                key: `system-${item.id}`,
                label: item.systemName,
                value: item.id,
              })) as any[]
            }
          />
          {isInChanging && systemId && <DatamapSankey dataSource={dbRecords} />}
          {isInChanging && systemId && <Table dataSource={dbRecords} columns={unmapColumns} />}
        </div>
      )}
    </div>
  );
}

export default DatabaseMap
