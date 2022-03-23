import React, { useEffect, useState } from "react";
import styles from "./Summary.less";
import { BaButton } from "@/components/Basic/Button/Button";
import { BaLabel } from "@/components/Basic/Label/Label";
import { BuGrade } from "@/components/Business/Grade/Grade";
import { useOverview, useOverviewCount } from "@/api/module/codeLine";
import { history } from "umi";
import { storage } from "@/store/storage/sessionStorage";
import useSystemList from "@/store/global-cache-state/useSystemList";
import GitChanges from "@/pages/systemSummary/Summary/components/GitChanges";
import { queryContainerServices } from "@/api/module/containerService";
import { Table } from 'antd';

function Summary() {
  const {data: overviewCount} = useOverviewCount();
  const [services, setServices] = useState([]);

  const [systemList] = useSystemList();
  const [systemName, setSystemName] = useState<string>("");

  const getSystemName = (): string => {
    const list = systemList?.value || [];
    const id = storage.getSystemId();

    return list.find((system) => system.id === parseInt(id))?.systemName || "";
  };

  useEffect(() => {
    setSystemName(getSystemName());
  }, [systemList]);

  useEffect(() => {
    queryContainerServices().then((res) => {
      setServices(res);
    });
  }, []);

  const columns = [
    {title: 'sourceMethod', dataIndex: 'sourceMethod', key: 'sourceMethod',},
    {title: 'targetUrl', dataIndex: 'targetUrl', key: 'targetUrl',},
    {title: 'targetHttpMethod', dataIndex: 'targetHttpMethod', key: 'targetHttpMethod',},
  ];

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.name}>{systemName}</div>
        </div>
        <BaButton onClick={() => history.push(`/${storage.getSystemId()}/systemEvolving/MeasureIndicators`)}>
          查看指标看板
        </BaButton>
      </div>

      <div className={styles.body}>
        <div className={styles.detail}>
          <div className={styles.overview}>
            <BaLabel value={overviewCount?.repoCount} text="代码仓数"></BaLabel>
            <BaLabel value={overviewCount?.moduleCount} text="模块数"></BaLabel>
            <BaLabel value={overviewCount?.lineCount} text="总代码量"></BaLabel>
            <BaLabel value={overviewCount?.contributorCount} text="代码贡献人数"></BaLabel>
            <BuGrade text="架构质量等级" grade={overviewCount?.qualityLevel}></BuGrade>
          </div>
        </div>
      </div>
      <div className={styles.changes}>
        <GitChanges/>
      </div>
      <div className={styles.changes}>
        <h2>API 服务/使用清单</h2>
        <Table dataSource={services} columns={columns}/>
      </div>
      <div className={styles.changes}>
        <h2>模型依赖度清单</h2>
      </div>
    </div>
  );
}

export default Summary;
