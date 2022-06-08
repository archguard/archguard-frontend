import React, { useEffect, useState } from "react";
import styles from "./Summary.less";
import { BaButton } from "@/components/Basic/Button/Button";
import { BaLabel } from "@/components/Basic/Label/Label";
import { BuGrade } from "@/components/Business/Grade/Grade";
import { useOverviewCount } from "@/api/module/codeLine";
import { history, useParams } from "umi";
import { useIntl } from "@@/plugin-locale/localeExports";
import { storage } from "@/store/storage/sessionStorage";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { queryContainerServices } from "@/api/module/containerService";
import { Switch, Table } from 'antd';
import FileChangeSizing from "@/pages/system/systemSummary/Summary/components/FileChangeSizing";
import FileSizing from "@/pages/system/systemSummary/Summary/components/FileSizing";
import { queryUnstableFiles } from "@/api/module/gitFile";
import ApiResourceTree from "@/pages/system/systemSummary/Summary/components/ApiResourceTree";
import { queryProjectCompositionDependency } from "@/api/module/project";
import LineCountChart from "@/pages/system/systemSummary/Summary/components/LineCountChart";
import { getAllIssue, IssuePosition } from "@/api/module/issue";
import {
  ClockCircleOutlined,
  DownCircleOutlined,
  ExclamationCircleOutlined,
  UpCircleOutlined
} from "@ant-design/icons";

function Summary() {
  const { formatMessage } = useIntl();
  const { data: overviewCount } = useOverviewCount();
  const [services, setServices] = useState({} as any);
  const [unstableFiles, setUnstableFiles] = useState([]);
  const [showFileSizing, setShowFileSizing] = useState(false);
  const [showFileChangeSizing, setShowFileChangeSizing] = useState(false);
  const [projectDependency, setProjectDependency] = useState([] as any);
  const [issues, setIssues] = useState([] as any);

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
    queryProjectCompositionDependency(systemId).then((res) => {
      setProjectDependency(res);
    });
  }, []);

  useEffect(() => {
    getAllIssue(systemId).then((res) => {
      setIssues(res);
    });
  }, [setIssues]);

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

  const projectDependencyColumns = [
    { title: "Tools", dataIndex: "packageManager", key: "packageManager" },
    { title: "Group", dataIndex: "depGroup", key: "depGroup" },
    { title: "dep artifact", dataIndex: "depArtifact", key: "depArtifact" },
    {
      title: "Scope",
      dataIndex: "depScope",
      key: "depScope",
      filters: [
        {
          text: 'NORMAL',
          value: 'NORMAL',
        },
        {
          text: 'RUNTIME',
          value: 'RUNTIME',
        },
        {
          text: 'TEST',
          value: 'TEST',
        },
        {
          text: 'OPTIONAL',
          value: 'OPTIONAL',
        },
        {
          text: 'DEV',
          value: 'DEV',
        }
      ],
      onFilter: (value: string, record) => record.depScope.indexOf(value) === 0,
      sorter: (a, b) => a.depScope.length - b.depScope.length,
    },
    { title: "Version", dataIndex: "depVersion", key: "depVersion" },
  ];

  let breakRender = (text, record) => (
    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
      {text}
    </div>
  );
  const issueColumns = [
    { title: "name", dataIndex: "name", key: "name" },
    { title: "detail", dataIndex: "detail", key: "detail", width: 300, render: breakRender },
    { title: "fullName", dataIndex: "fullName", key: "fullName", width: 200, render: breakRender },
    { title: "ruleId", dataIndex: "ruleId", key: "ruleId", width: 300, render: breakRender },
    {
      title: "ruleType",
      dataIndex: "ruleType",
      key: "ruleType",
      width: 200,
      filters: [
        {
          text: "TEST_CODE_SMELL",
          value: "TEST_CODE_SMELL",
        },
        {
          text: "HTTP_API_SMELL",
          value: "HTTP_API_SMELL",
        },
        {
          text: "SQL_SMELL",
          value: "SQL_SMELL",
        },
        {
          text: "LAYER",
          value: "LAYER",
        },
      ],
      onFilter: (value: string, record) => record.ruleType.indexOf(value) === 0,
      sorter: (a, b) => a.ruleType.length - b.ruleType.length,
      render: breakRender,
    },
    {
      title: "severity",
      dataIndex: "severity",
      width: 50,
      key: "severity",
      filters: [
        {
          text: "HINT",
          value: "HINT",
        },
        {
          text: "WARN",
          value: "WARN",
        },
        {
          text: "INFO",
          value: "INFO",
        },
        {
          text: "BLOCKER",
          value: "BLOCKER",
        },
      ],
      onFilter: (value: string, record) => record.severity.indexOf(value) === 0,
      sorter: (a, b) => a.severity.length - b.severity.length,
      render: (text, record) => {
        switch (text) {
          case "HINT":
            return <ClockCircleOutlined style={{ fontSize: "24px", color: "#08c" }} />;
          case "WARN":
            return <UpCircleOutlined style={{ fontSize: "24px", color: "#c0c0c0" }} />;
          case "INFO":
            return <DownCircleOutlined style={{ fontSize: "24px", color: "#0f0" }} />;
          case "BLOCKER":
            return <ExclamationCircleOutlined style={{ fontSize: "24px", color: "#f00" }} />;
          default:
            return "";
        }
      },
    },
    { title: "source", dataIndex: "source", key: "source", render: breakRender },
    {
      title: "position",
      dataIndex: "position",
      key: "position",
      width: 50,
      render: (text, record) => {
        if (!text || text == "{}") return "";

        var pos: IssuePosition = JSON.parse(text);
        return `${pos.startLine}:${pos.startColumn}-${pos.endLine}:${pos.endColumn}`;
      },
    },
  ];

  function toggleFileSizing() {setShowFileSizing(!showFileSizing)}
  function toggleFileChangeSizing() {setShowFileChangeSizing(!showFileChangeSizing)}

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
          { overviewCount?.lineCounts && <LineCountChart  dataSource={ overviewCount?.lineCounts } /> }
        </div>
      </div>
      <h2>{ formatMessage({ id: 'SYSTEM_OVERVIEW.UNSTABLE' }) }</h2>
      <div className={ styles.physical }>
        <div className={ styles.changes }>
          <div className={ styles.graph }>
            <h2>{ formatMessage({ id: 'SYSTEM_OVERVIEW.CHANGE_FREQUENCY_SIZE' }) }</h2>
            <div>Show: <Switch onChange={toggleFileSizing} /></div>
            { showFileSizing && <FileSizing systemId={ systemId }/> }
          </div>
          <div className={ styles.graph }>
            <h2>{ formatMessage({ id: 'SYSTEM_OVERVIEW.CHANGE_FREQUENCY_SIZE_LINE_COUNT' }) }</h2>
            <div>Show: <Switch onChange={toggleFileChangeSizing} /></div>
            { showFileChangeSizing && <FileChangeSizing systemId={ systemId }/> }
          </div>
        </div>
        <div>
          <h2>{ formatMessage({ id: 'SYSTEM_OVERVIEW.UNSTABLE_TOP_50_FILE' }) }</h2>
          <Table dataSource={ unstableFiles } columns={ unstableColumns } pagination={
            { defaultPageSize: 5 }
          }/>
        </div>
      </div>
      <div>
        <h2>{ formatMessage({ id: 'SYSTEM_OVERVIEW.PROJECT_DEPENDENCY' }) } ({ projectDependency.length })</h2>
        <Table dataSource={ projectDependency } columns={ projectDependencyColumns }/>
      </div>
      <div>
        <h2>Issues ({ issues.length })</h2>
        <Table tableLayout={"auto"} dataSource={ issues } columns={ issueColumns } />
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
