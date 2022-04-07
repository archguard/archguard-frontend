import React, { useCallback, useEffect, useState } from "react";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { Select, Table } from "antd";
import { storage } from "@/store/storage/sessionStorage";
import { queryDatamap } from "@/api/datamap/datamap";
import { useParams } from "umi";
import DatamapSankey from "@/pages/data/components/DatamapSankey";

const DatabaseMap = () => {
  const [systemInfo] = useSystemList();
  const [isInChanging, setIsInChanging] = useState(false);
  // @ts-ignore
  const [systemId, setSystemId] = useState(useParams().systemId);
  const [dbRecords, setDbRecords] = useState([]);

  const onSystemChange = useCallback((index: number) => {
    setIsInChanging(false)
    let system = systemInfo?.value!.filter((item) => item.id === index)[0]
    if (!!system) {
      storage.setSystemId(system.id);
      storage.setSystemLanguage(system.language);

      setSystemId(system.id)

      queryDatamap(system.id).then((res) => {
        setDbRecords(res)
        setIsInChanging(true);
      })
    }
  }, [setIsInChanging, setDbRecords]);

  const unmapColumns = [
    { title: 'packageName', dataIndex: 'packageName' },
    { title: 'className', dataIndex: 'className' },
    { title: 'functionName', dataIndex: 'functionName', },
    { title: 'tables', dataIndex: 'tables', },
  ]

  return (
    <div>
      { systemInfo?.value &&
        <>
          <p>当前支持 Java/Kotlin 中的 JPA/JDBI</p>
          <Select
            style={ { width: 150, color: "#000" } }
            bordered={ true }
            showArrow={ true }
            placeholder="请选择系统"
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
