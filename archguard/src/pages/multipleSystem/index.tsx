import "./index.less";
import React, { useState, useRef, useEffect } from "react";
import { Tabs, Row, Col, Modal, notification, Button } from "antd";
import { useMount, useInterval } from "react-use";
import { QuestionCircleOutlined, UpOutlined, GlobalOutlined } from "@ant-design/icons";
import { cancelScanDependence, scanDependence } from "@/api/scanner/dependenceScanner";
import {
  SystemInfo,
  createSystemInfo,
  updateSystemInfo,
  deleteSystem,
} from "@/api/addition/systemInfo";
import { storage } from "@/store/storage/sessionStorage";
import useSystemList from "@/store/global-cache-state/useSystemList";
import SystemCard from "./components/SystemCard";
import SystemInfoForm from "./components/SystemInfoForm";
import { FEATURES, getFeature } from "@/components/Business/Layouts/PageHeader";
import Help from "../help";
import {setLocale, useIntl} from "@@/plugin-locale/localeExports";
import ServicesMap from "../servicesMap/ServicesMap";

interface UserProfile {
  name?: string;
  account?: string;
}

const DEFAULT_LOAD_DATA_INTERVAL = 1000 * 60 * 5;

const MultipleSystem = () => {
  const { formatMessage } = useIntl();
  const ref = useRef<any>({});
  const [user, setUser] = useState<UserProfile>();
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
    setUser({ name: "ArchGuard", account: "admin" });
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
    window.location.href = `/${id}/systemSummary/Summary`;
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
      content: `确定要删除 ${systemInfo.systemName} 系统吗？`,
      centered: true,
      onOk: () => {
        deleteSystem(systemInfo.id).then(() => {
          loadSystemList();
        });
      },
    });
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
    const errorResult = Object.values(errorList).filter((t: any) => { return t.errors.length > 0 }).length;
    if (errorResult === 0) {
      setCurrent(current + 1);
    }
  };

  const prevButton = () => {
    setCurrent(current - 1);
  };

  const setLanguage = () => {
    if (currentLanguage === "zh-CN") {
      setCurrentLanguage("en-US")
    } else {
      setCurrentLanguage("zh-CN")
    }

    setLocale(currentLanguage, false);
  };


  return (
    <div className="multiple-system-container">
      <div className="multiple-system-header">
        <div className="header-logo">
          <img src={require("@/assets/images/logo.png")} alt="logo"></img>
        </div>
        {user && (
          <div className="header-user">
            <div>
              <Button
                icon={<GlobalOutlined />}
                onClick={() => setLanguage()}
              >
                {formatMessage({ id: 'SWITCH_LANGUAGE'})}
              </Button>
            </div>
            <div>
              {getFeature(FEATURES.INSIDE_FEATURE) && (
                <Button
                  type="link"
                  style={{ color: "#ffffff" }}
                  icon={<QuestionCircleOutlined />}
                  onClick={() => setHelpModalVisible(true)}
                >
                  {formatMessage({ id: 'OPERATION_DOCUMENT'})}
                </Button>
              )}
            </div>

            <div className="user-info">
              <img src={require("@/assets/images/userProfile.png")}></img>
              <span className="user-name">
                {user.name} / {user.account}
              </span>
              <UpOutlined className="user-icon" />
            </div>
          </div>
        )}
      </div>
      <div className="multiple-system-selector">
        <Tabs defaultActiveKey="my-system">
          <Tabs.TabPane tab={formatMessage({ id: 'COMPONENT_ANALYSIS'})} key="my-system">
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                <SystemCard onClick={onCreateClick}></SystemCard>
              </Col>
              {systemInfoList.map((systemInfo) => (
                <Col xs={24} sm={12} md={8} lg={6} xxl={4} key={systemInfo.id}>
                  <SystemCard
                    systemInfo={systemInfo}
                    onClick={() => routeToHome(systemInfo)}
                    onScanning={() => onScanning(systemInfo.id)}
                    onEdit={() => onEditClick(systemInfo)}
                    onCancel={() => onCancelClick(systemInfo)}
                    onRemove={() => onRemoveClick(systemInfo)}
                  ></SystemCard>
                </Col>
              ))}
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab={formatMessage({ id: 'SERVICES_MAP'})} key="services-map">
            <ServicesMap />
          </Tabs.TabPane>
          <Tabs.TabPane tab={formatMessage({ id: 'CODE_ANALYSIS'})} key="code-analysis" disabled>

          </Tabs.TabPane>
          <Tabs.TabPane tab={formatMessage({ id: 'DATABASE_MAP'})} key="database-map" disabled></Tabs.TabPane>
        </Tabs>
      </div>
      <Modal
        centered
        maskClosable={false}
        visible={modalVisible}
        onCancel={onCancel}
        onOk={onSubmit}
        destroyOnClose={true}
        bodyStyle={{ height: "560px", overflowY: "auto", padding: "32px" }}
        footer={[
          current === 0 && <Button type="primary" onClick={() => nextButton()}>
            {formatMessage({ id: 'NEXT'})}
          </Button>,
          current === 1 && <Button style={{ margin: '0 8px' }} onClick={() => prevButton()}>
            {formatMessage({ id: 'PREV'})}
          </Button>,
          current === 1 && <Button type="primary" onClick={onSubmit}>
            {formatMessage({ id: 'OK'})}
          </Button>,
        ]}
      >
        <SystemInfoForm
          ref={ref}
          data={currentSystemInfo}
          onSubmit={onSubmitSystemInfo}
          current={current}
          currentAction={currentAction}
        ></SystemInfoForm>
      </Modal>

      <Modal
        onCancel={() => setHelpModalVisible(false)}
        width={1300}
        footer={null}
        maskClosable={true}
        centered
        visible={helpModalVisible}
      >
        <Help />
      </Modal>
    </div>
  );
};

export default MultipleSystem;
