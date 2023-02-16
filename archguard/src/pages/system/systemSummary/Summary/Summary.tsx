import React, { useEffect, useState } from "react";
import "./Summary.less";
import { BaButton } from "@/components/Basic/Button/Button";
import { BaLabel } from "@/components/Basic/Label/Label";
import { BuGrade } from "@/components/Business/Grade/Grade";
import { useOverviewCount } from "@/api/module/codeLine";
import { history, useParams } from "umi";
import { useIntl } from "@@/plugin-locale/localeExports";
import { storage } from "@/store/storage/sessionStorage";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { Switch, Table } from 'antd';
import FileChangeSizing from "@/pages/system/systemSummary/Summary/components/FileChangeSizing";
import FileSizing from "@/pages/system/systemSummary/Summary/components/FileSizing";
import { queryUnstableFiles } from "@/api/module/gitFile";
import { queryProjectCompositionDependency } from "@/api/module/project";
import LineCountChart from "@/pages/system/systemSummary/Summary/components/LineCountChart";
import { projectDependencyColumns } from "@/pages/system/systemSummary/Summary/columns/projectDependencyColumns";
import { summaryStacks } from "@/pages/system/systemSummary/Summary/stacks/summaryStacks";
import { querySystemInfoById } from "@/api/addition/systemInfo";

function Summary() {
  const { formatMessage } = useIntl();
  const { data: overviewCount } = useOverviewCount();
  const [unstableFiles, setUnstableFiles] = useState([]);
  const [showFileSizing, setShowFileSizing] = useState(false);
  const [showFileChangeSizing, setShowFileChangeSizing] = useState(false);
  const [projectDependency, setProjectDependency] = useState([] as any);
  const [stacks, setStacks] = useState(null as any);
  const [system, setSystem] = useState(null as any);

  const { systemId } = useParams();
  storage.setSystemId(systemId)

  const [systemList] = useSystemList();
  const [systemName, setSystemName] = useState<string>("");

  useEffect(() => {
    const list = systemList?.value || [];
    let optSystem = list.find((system) => system.id === parseInt(systemId));
    const systemName = optSystem?.systemName || "";
    setSystemName(systemName);
  }, [systemList, setSystem]);

  useEffect(() => {
    querySystemInfoById(systemId).then((systemInfo) => {
      setSystem(systemInfo)

      queryProjectCompositionDependency(systemId).then((res) => {
        setProjectDependency(res);
        setStacks(summaryStacks(res, systemInfo))
      });
    })
  }, [setStacks, setSystem, systemId]);

  useEffect(() => {
    queryUnstableFiles(systemId).then((res) => {
      setUnstableFiles(res as any);
    });
  }, []);

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

  function toggleFileSizing() {setShowFileSizing(!showFileSizing)}
  function toggleFileChangeSizing() {setShowFileChangeSizing(!showFileChangeSizing)}

  return <div>
    <div className="header">
      <div className="title">
        <div className="name">{systemName}</div>
      </div>
      <BaButton
        onClick={() => history.push(`/${storage.getSystemId()}/systemEvolving/MeasureIndicators`)}
      >
        {formatMessage({ id: "SYSTEM_OVERVIEW.VIEW_METRIC_DASHBOARD" })}
      </BaButton>
    </div>
    <div className="body">
      <div className="detail">
        <div className="overview">
          <BaLabel
            value={overviewCount?.contributorCount}
            text={formatMessage({ id: "SYSTEM_OVERVIEW.CONTRIBUTORS" })}
          />
          <BuGrade
            text={formatMessage({ id: "SYSTEM_OVERVIEW.ARCH_LEVEL" })}
            grade={(overviewCount as any)?.qualityLevel}
          />
        </div>
      </div>
      <div className="changes">
        <Table
          className="code-chart"
          rowKey={(index) => index}
          dataSource={overviewCount?.lineCounts}
          columns={lineCountColumns}
          size={"middle"}
          pagination={{ defaultPageSize: 5 }}
        />
        {overviewCount?.lineCounts && <LineCountChart dataSource={(overviewCount as any)?.lineCounts} />}
      </div>
    </div>
    <h2>{formatMessage({ id: "SYSTEM_OVERVIEW.STABLE" })}</h2>
    <div className="physical">
      <div className="changes">
        <div className="graph">
          <h2>{formatMessage({ id: "SYSTEM_OVERVIEW.CHANGE_FREQUENCY_SIZE" })}</h2>
          <div>
            Show: <Switch onChange={toggleFileSizing} />
          </div>
          {showFileSizing && <FileSizing systemId={systemId} />}
        </div>
        <div className="graph">
          <h2>{formatMessage({ id: "SYSTEM_OVERVIEW.CHANGE_FREQUENCY_SIZE_LINE_COUNT" })}</h2>
          <div>
            Show: <Switch onChange={toggleFileChangeSizing} />
          </div>
          {showFileChangeSizing && <FileChangeSizing systemId={systemId} />}
        </div>
      </div>
      <div>
        <h2>{formatMessage({ id: "SYSTEM_OVERVIEW.UNSTABLE_TOP_50_FILE" })}</h2>
        <Table
          dataSource={unstableFiles}
          rowKey={(index) => index}
          columns={unstableColumns}
          pagination={{ defaultPageSize: 5 }}
        />
      </div>
    </div>
    <div>
      <h2>
        {formatMessage({ id: "SYSTEM_OVERVIEW.PROJECT_DEPENDENCY" })} ({projectDependency.length})
      </h2>
      <div>
        {stacks && stacks.icons && <div className="stack-icons">
            {stacks.icons.map((item: string, index: number) => (
              <div className="stack-item" key={index}>
                <img src={item.img} alt={"text"} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>}
      </div>
      <Table dataSource={projectDependency as any} rowKey={(index) => index} columns={projectDependencyColumns} />
    </div>
  </div>;
}

export default Summary;
