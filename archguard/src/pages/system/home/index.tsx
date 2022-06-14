import "./index.less";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, notification, Row } from "antd";
import { useInterval, useMount } from "react-use";
import { cancelScanDependence, scanDependence } from "@/api/scanner/dependenceScanner";
import {
  createSystemInfo,
  deleteSystem,
  SystemInfo,
  updateSystemInfo,
  viewSystemLog,
} from "@/api/addition/systemInfo";
import { storage } from "@/store/storage/sessionStorage";
import useSystemList from "@/store/global-cache-state/useSystemList";
import SystemCard from "./components/SystemCard";
import SystemInfoForm from "./components/SystemInfoForm";
import Help from "../../help";
import { useIntl } from "@@/plugin-locale/localeExports";
import newGithubIssueUrl from "new-github-issue-url";

const DEFAULT_LOAD_DATA_INTERVAL = 1000 * 60 * 5;

const Home = () => {
  const { formatMessage } = useIntl();
  const ref = useRef<any>({});
  const [systemList, loadSystemList] = useSystemList();
  const [systemInfoList, setSystemInfoList] = useState<SystemInfo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [currentSystemInfo, setCurrentSystemInfo] = useState<SystemInfo>();
  const [current, setCurrent] = useState(0);
  const [currentAction, setCurrentAction] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('zh-CN');

  useMount(() => {
    storage.clear();
  });

  useEffect(() => {
    setSystemInfoList(systemList?.value || []);
  }, [systemList]);

  useInterval(() => {
    loadSystemList();
  }, DEFAULT_LOAD_DATA_INTERVAL);

  const routeToHome = (systemInfo: SystemInfo) => {
    if (systemInfo.scanned !== "SCANNED") return;
    const { id } = systemInfo;
    storage.setSystemId(id);
    storage.setSystemLanguage(systemInfo.language);
    window.location.href = `/${ id }/systemSummary/Summary`;
  };

  const onSubmitSystemInfo = (systemInfo: SystemInfo) => {
    if (systemInfo.id) {
      updateSystemInfo(systemInfo).then(() => {
        notification.success({
          type: "success",
          message: "系统信息修改成功！",
        });
        onCancel();
        loadSystemList();
      });
    } else {
      createSystemInfo(systemInfo).then(() => {
        notification.success({
          type: "success",
          message: "系统创建成功！",
        });
        onCancel();
        loadSystemList();
      });
    }
  };

  const onCreateClick = () => {
    setCurrentSystemInfo(undefined);
    setModalVisible(true);
    setCurrentAction('create');
  };

  const onEditClick = (systemInfo: SystemInfo) => {
    setCurrentSystemInfo({ ...systemInfo });
    storage.setSystemId(systemInfo.id);
    storage.setSystemLanguage(systemInfo.language);
    setModalVisible(true);
    setCurrentAction('edit');
  };

  const onCancelClick = (systemInfo: SystemInfo) => {
    cancelScanDependence(systemInfo.id).then(() => {
      loadSystemList();
    });
  };

  const onRemoveClick = (systemInfo: SystemInfo) => {
    Modal.confirm({
      type: "error",
      title: "删除",
      content: `确定要删除 ${ systemInfo.systemName } 系统吗？`,
      centered: true,
      onOk: () => {
        deleteSystem(systemInfo.id).then(() => {
          loadSystemList();
        });
      },
    });
  };

  const onViewLog = (systemInfo: SystemInfo) => {
    viewSystemLog(systemInfo.id).then(({ log }) => {
      Modal.confirm({
        type: "info",
        title: "日志",
        cancelText: "创建 Issue",
        style: { whiteSpace: "pre" },
        width: "80%",
        content: log.split(/\\n/)
          .reduce((result: any, word) => {
            return result.length ? [...result, <br/>, word] : [word];
          }, []),
        onCancel: async () => {
          const url = newGithubIssueUrl({
            user: 'archguard',
            repo: 'archguard',
            body: `
**System info**

- language: ${systemInfo.language}
- codePath: ${systemInfo.codePath}
- repoType: ${systemInfo.repoType}
- badSmellThresholdSuiteId: ${systemInfo.badSmellThresholdSuiteId}

**Log**
\`\`\`
${log}
\`\`\`

`,
            template: 'bug_report.md',
            title: 'Scan failure:'
          });

          await open(url);
        },
        centered: true
      });
    })
  };

  const onSubmit = () => {
    ref.current.submit();
    setCurrent(0);
  };

  const onCancel = () => {
    setModalVisible(false);
    ref.current.clear();
    setCurrent(0);
  };

  const onScanning = (id: number) => {
    scanDependence(id).then(() => {
      loadSystemList();
    });
  };

  const nextButton = () => {
    const errorList = ref.current.validateFields();
    const errorResult = Object.values(errorList).filter((t: any) => {
      return t.errors.length > 0
    }).length;
    if (errorResult === 0) {
      setCurrent(current + 1);
    }
  };

  const prevButton = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <div className="multiple-system-selector">
        <Row gutter={ [12, 12] }>
          <Col xs={ 24 } sm={ 12 } md={ 8 } lg={ 6 } xxl={ 4 }>
            <SystemCard onCreate={ onCreateClick }/>
          </Col>
          { systemInfoList.map((systemInfo) => (
            <Col xs={ 24 } sm={ 12 } md={ 8 } lg={ 6 } xxl={ 4 } key={ systemInfo.id }>
              <SystemCard
                systemInfo={ systemInfo }
                onCreate={ () => routeToHome(systemInfo) }
                onScanning={ () => onScanning(systemInfo.id) }
                onEdit={ () => onEditClick(systemInfo) }
                onCancel={ () => onCancelClick(systemInfo) }
                onRemove={ () => onRemoveClick(systemInfo) }
                viewLog={ () => onViewLog(systemInfo) }
              />
            </Col>
          )) }
        </Row>
      </div>
      <Modal
        centered
        maskClosable={ false }
        visible={ modalVisible }
        onCancel={ onCancel }
        onOk={ onSubmit }
        destroyOnClose={ true }
        bodyStyle={ { height: "560px", overflowY: "auto", padding: "32px" } }
        footer={ [
          current === 0 && <Button type="primary" onClick={ () => nextButton() }>
            { formatMessage({ id: 'NEXT' }) }
          </Button>,
          current === 1 && <Button style={ { margin: '0 8px' } } onClick={ () => prevButton() }>
            { formatMessage({ id: 'PREV' }) }
          </Button>,
          current === 1 && <Button type="primary" onClick={ onSubmit }>
            { formatMessage({ id: 'OK' }) }
          </Button>,
        ] }
      >
        <SystemInfoForm
          ref={ ref }
          data={ currentSystemInfo }
          onSubmit={ onSubmitSystemInfo }
          current={ current }
          currentAction={ currentAction }
        />
      </Modal>

      <Modal
        onCancel={ () => setHelpModalVisible(false) }
        width={ 1300 }
        footer={ null }
        maskClosable={ true }
        centered
        visible={ helpModalVisible }
      >
        <Help/>
      </Modal>
    </div>
  );
};

export default Home;
