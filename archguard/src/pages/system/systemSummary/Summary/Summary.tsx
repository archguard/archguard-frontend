import React, { useEffect, useState } from "react";
import styles from "./Summary.less";
import { BaButton } from "@/components/Basic/Button/Button";
import { BaLabel } from "@/components/Basic/Label/Label";
import { BuGrade } from "@/components/Business/Grade/Grade";
import { useOverviewCount } from "@/api/module/codeLine";
import { history, useIntl, useParams } from "umi";
import { storage } from "@/store/storage/sessionStorage";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { queryContainerServices } from "@/api/module/containerService";
import { Table } from 'antd';
import FileChangeSizing from "@/pages/system/systemSummary/Summary/components/FileChangeSizing";
import FileSizing from "@/pages/system/systemSummary/Summary/components/FileSizing";
import { queryUnstableFiles } from "@/api/module/gitFile";
import { DonutChart } from "bizcharts";
import ApiResourceTree from "@/pages/system/systemSummary/Summary/components/ApiResourceTree";

function Summary() {
  const { formatMessage } = useIntl();
  const { data: overviewCount } = useOverviewCount();
  const [services, setServices] = useState({} as any);
  const [unstableFiles, setUnstableFiles] = useState([]);

  const { systemId } = useParams();
  storage.setSystemId(systemId)

  const [systemList] = useSystemList();
  const [systemName, setSystemName] = useState<string>("");

  const getSystemName = (): string => {
    const list = systemList?.value || [];
    return list.find((system) => system.id === parseInt(systemId))?.systemName || "";
  };

  useEffect(() => {
    setSystemName(getSystemName());
  }, [systemList]);

  useEffect(() => {
    queryContainerServices(systemId).then((res) => {
      setServices(res);
    });
  }, []);

  useEffect(() => {
    queryUnstableFiles(systemId).then((res) => {
      setUnstableFiles(res as any);
    });
  }, []);

  const demandColumns = [
    { title: 'Source Method', dataIndex: 'sourceMethod', key: 'sourceMethod', },
    { title: 'URI', dataIndex: 'targetUrl', key: 'targetUrl', },
    { title: 'HTTP Method', dataIndex: 'targetHttpMethod', key: 'targetHttpMethod', },
  ];

  const resourceColumns = [
    { title: 'Package Name', dataIndex: 'packageName', key: 'packageName', },
    { title: 'className', dataIndex: 'className', key: 'className', },
    { title: 'methodName', dataIndex: 'methodName', key: 'methodName', },
    { title: 'sourceHttpMethod', dataIndex: 'sourceHttpMethod', key: 'sourceHttpMethod', },
    { title: 'sourceUrl', dataIndex: 'sourceUrl', key: 'sourceUrl', },
  ];

  const lineCountColumns = [
    { title: formatMessage({ id: 'SYSTEM_OVERVIEW.LANGUAGE' }), dataIndex: 'language', key: 'language', },
    { title: formatMessage({ id: 'SYSTEM_OVERVIEW.LINE_COUNT' }), dataIndex: 'lineCount', key: 'lineCount', },
    { title: formatMessage({ id: 'SYSTEM_OVERVIEW.FILE_COUNT' }), dataIndex: 'fileCount', key: 'fileCount', },
  ];

  const unstableColumns = [
    { title: formatMessage({ id: 'SYSTEM_OVERVIEW.PATH' }), dataIndex: 'path', key: 'path', },
    { title: formatMessage({ id: 'SYSTEM_OVERVIEW.CHANGES' }), dataIndex: 'changes', key: 'changes', },
    { title: formatMessage({ id: 'SYSTEM_OVERVIEW.LINES' }), dataIndex: 'lineCount', key: 'lineCount', },
  ];

  return (
    <div>
      <div className={ styles.header }>
        <div className={ styles.title }>
          <div className={ styles.name }>{ systemName }</div>
        </div>
        <BaButton onClick={ () => history.push(`/${ storage.getSystemId() }/systemEvolving/MeasureIndicators`) }>
          { formatMessage({ id: 'SYSTEM_OVERVIEW.VIEW_METRIC_DASHBOARD' }) }
        </BaButton>
      </div>

      <div className={ styles.body }>
        <div className={ styles.detail }>
          <div className={ styles.overview }>
            {/*<BaLabel value={ overviewCount?.repoCount } text="代码仓数"/>*/ }
            <BaLabel value={ overviewCount?.moduleCount }
                     text={ formatMessage({ id: 'SYSTEM_OVERVIEW.MODULE_COUNT' }) }/>
            <BaLabel value={ overviewCount?.contributorCount }
                     text={ formatMessage({ id: 'SYSTEM_OVERVIEW.CONTRIBUTORS' }) }/>
            <BuGrade text={ formatMessage({ id: 'SYSTEM_OVERVIEW.ARCH_LEVEL' }) }
                     grade={ overviewCount?.qualityLevel }/>
          </div>
        </div>
        <div className={ styles.changes }>
          <Table className={ styles.codeChart } dataSource={ overviewCount?.lineCounts } columns={ lineCountColumns }
                 size={ 'middle' } pagination={
            { defaultPageSize: 5 }
          }/>
          <DonutChart
            data={ overviewCount?.lineCounts || [] }
            autoFit
            height={ 350 }
            width={ 600 }
            radius={ 0.8 }
            padding="auto"
            angleField="lineCount"
            colorField="language"
            pieStyle={ { stroke: "white", lineWidth: 5 } }
          />
        </div>
      </div>
      <h2>{ formatMessage({ id: 'SYSTEM_OVERVIEW.UNSTABLE' }) }</h2>
      <div className={ styles.physical }>
        <div className={ styles.changes }>
          <div className={ styles.graph }>
            <h2>{ formatMessage({ id: 'SYSTEM_OVERVIEW.CHANGE_FREQUENCY_SIZE' }) }</h2>
            <FileSizing systemId={ systemId }/>
          </div>
          <div className={ styles.graph }>
            <h2>{ formatMessage({ id: 'SYSTEM_OVERVIEW.CHANGE_FREQUENCY_SIZE_LINE_COUNT' }) }</h2>
            <FileChangeSizing systemId={ systemId }/>
          </div>
        </div>
        <div>
          <h2>{ formatMessage({ id: 'SYSTEM_OVERVIEW.UNSTABLE_TOP_50_FILE' }) }</h2>
          <Table dataSource={ unstableFiles } columns={ unstableColumns } pagination={
            { defaultPageSize: 5 }
          }/>
        </div>
      </div>
      <div className={ styles.physical }>
        <div className={ styles.demand }>
          <h2>{ formatMessage({ id: 'SYSTEM_OVERVIEW.API_DEMAND_LIST' }) } ({ services["demands"]?.length })</h2>
          <Table dataSource={ services["demands"] } columns={ demandColumns }/>
        </div>
        { services["resources"]?.length &&
          <div className={ styles.resource }>
            <h2>{ formatMessage({ id: 'SYSTEM_OVERVIEW.API_RESOURCE_LIST' }) } ({ services["resources"]?.length })</h2>
            <Table dataSource={ services["resources"] } columns={ resourceColumns }/>
            <ApiResourceTree dataSource={ services["resources"] }/>
          </div>
        }
      </div>
    </div>
  );
}

export default Summary;
