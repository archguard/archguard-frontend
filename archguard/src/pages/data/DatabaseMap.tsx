import React, { useCallback, useState } from "react";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { Select, Table } from "antd";
import { storage } from "@/store/storage/sessionStorage";
import { queryDatamap } from "@/api/datamap/datamap";
import { useParams } from "umi";
import { useIntl } from "@@/plugin-locale/localeExports";
import DatamapSankey from "@/pages/data/components/DatamapSankey";
import { newLineMessage } from "@/utils/newLineMessage";

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

  const unmapColumns = [
    { title: "packageName", dataIndex: "packageName", sorter: sortFunc("packageName") },
    { title: "className", dataIndex: "className", sorter: sortFunc("className") },
    { title: "functionName", dataIndex: "functionName", sorter: sortFunc("functionName") },
    { title: "tables", dataIndex: "tables", sorter: sortFunc("tables") },
  ];

  return (
    <div>
      { systemInfo?.value &&
        <>
          <p>{newLineMessage(formatMessage, "DATABASE_MAP_TIPS")}
            <a href="https://github.com/archguard/archguard"
               target={ "_blank" }
               rel="noreferrer">https://github.com/archguard/archguard</a>
          </p>
          <Select
            style={ { width: 350, color: "#000" } }
            bordered={ true }
            showArrow={ true }
            placeholder={ formatMessage({ id: 'SELECT_SYSTEM' }) }
            onChange={ (index) => onSystemChange(index) }
          >
            { systemInfo?.value!.map((system, index) => (
              <Select.Option
                disabled={ system.scanned !== "SCANNED" }
                value={ system.id }
                key={ `${ system.systemName }_${ index }` }
              >
                { system.systemName }
              </Select.Option>
            )) }
          </Select>
          { isInChanging && systemId && <DatamapSankey dataSource={ dbRecords }/> }
          { isInChanging && systemId && <Table dataSource={ dbRecords } columns={ unmapColumns }/> }
        </>
      }
    </div>
  )
}

export default DatabaseMap
