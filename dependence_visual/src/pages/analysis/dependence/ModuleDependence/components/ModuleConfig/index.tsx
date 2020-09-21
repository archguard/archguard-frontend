import {
  autoDefineModule,
  deleteModule,
  hideAllModules,
  queryModuleOptions,
  reverseAllModules,
  showAllModules,
  updateModule,
  Module,
} from "@/api/module/module";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, notification, Table, Tag, Tooltip } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import useModules from "@/store/global-cache-state/useModules";
import ModuleConfigModal from "../ModuleConfigModal";
import "./index.less";
import CollapsibleCard from '@/components/Business/CollapsibleCard';

export default function ModuleConfig() {
  const [modules, load] = useModules();
  const loading = modules?.loading
  const value = modules?.value || []
  const [editingModule, setEditingModule] = useState<Module>();

  const removeModule = useCallback(
    (module) => {
      deleteModule(module).then(() => {
        load();
        notification.success({
          message: "删除模块成功！",
        });
      });
    },
    [load],
  );

  const toggleHiddenModule = useCallback(
    (module) => {
      module.status = module.status === "HIDE" ? "NORMAL" : "HIDE";
      updateModule(module).then(load);
    },
    [load],
  );

  const columns = useMemo(() => {
    return [
      { title: "逻辑模块名", dataIndex: "name", width: 300 },
      {
        title: "Members",
        render({ members }: Module) {
          return (
            <div>
              {members.map((member, index) => (
                <Tag key={index}>{member}</Tag>
              ))}
            </div>
          );
        },
      },
      {
        title: "操作",
        width: 250,
        render: (item: Module) => {
          return (
            <Button.Group>
              <Button onClick={() => setEditingModule(item)} icon={<FormOutlined />}>
                修改
              </Button>
              <Button
                onClick={() => toggleHiddenModule(item)}
                icon={item.status === "NORMAL" ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              >
                {item.status === "NORMAL" ? "隐藏" : "展示"}
              </Button>
              <Button danger onClick={() => removeModule(item)} icon={<DeleteOutlined />}>
                删除
              </Button>
            </Button.Group>
          );
        },
      },
    ];
  }, [removeModule, toggleHiddenModule]);

  const onReverseAll = () => {
    reverseAllModules().then((res) => {
      notification.success({ message: "反转所有模块状态成功！" });
      load();
    });
  };

  const onShowAll = () => {
    showAllModules().then((res) => {
      notification.success({ message: "展示所有模块成功！" });
      load();
    });
  };

  const onHideAll = () => {
    hideAllModules().then((res) => {
      notification.success({ message: "隐藏全部模块成功" });
      load();
    });
  };

  const onRefreshModules = () => {
    queryModuleOptions().then((res) => {
      notification.success({ message: "刷新(重排序)成功！" });
      load();
    });
  };

  const onAutoDefine = () => {
    autoDefineModule().then((res) => {
      notification.success({ message: "自动定义成功！" });
      load();
    });
  };

  return (
    <CollapsibleCard
      className="module-config"
      title="自定义逻辑模块"
      collapsed={true}
      extra={
        <div>
          <Button onClick={onReverseAll}>全部反转</Button>
          <Button onClick={onShowAll}>全部展示</Button>
          <Button onClick={onHideAll}>全部隐藏</Button>
          <Button onClick={onRefreshModules}>刷新(重排序)</Button>
          <Tooltip title="从依赖扫描结果中自动定义逻辑模块">
            <Button onClick={onAutoDefine}>自动定义</Button>
          </Tooltip>
        </div>
      }
    >
      <Table
        bordered
        footer={() => (
          <Button
            onClick={() => setEditingModule({ name: "", members: [] })}
            style={{ width: "100%" }}
            icon={<PlusOutlined />}
            type="dashed"
          >
            新增模块
          </Button>
        )}
        size="small"
        rowKey="id"
        pagination={false}
        dataSource={value}
        loading={loading}
        columns={columns}
      />
      <ModuleConfigModal
        onSuccess={() => {
          load();
          setEditingModule(undefined);
        }}
        module={editingModule!}
        onClose={() => setEditingModule(undefined)}
        visible={!!editingModule}
      />
    </CollapsibleCard>
  );
}
