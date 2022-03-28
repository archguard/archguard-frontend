import {
  autoDefineModule,
  deleteModule,
  hideAllModules, queryModule,
  queryModuleOptions,
  reverseAllModules,
  showAllModules,
  updateModule,
} from "@/api/module/module";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, notification, Table, Tag, Tooltip } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ModuleConfigModal from "../ModuleConfigModal";
import "./index.less";
import CollapsibleCard from '@/components/Business/CollapsibleCard';
import { Module } from "@/types/module";
import _ from 'lodash';

interface ModuleConfigProps {
  systemId: number
}

export default function ModuleConfig(props: ModuleConfigProps) {
  const [loading, setLoading] = useState(false)
  const [modules, setModules] = useState([]);
  const [editingModule, setEditingModule] = useState<Module>();

  let load = useCallback(() => {
    setLoading(true)
    queryModule(props.systemId).then((res) =>
      _.orderBy(res, ["status", "name"], ["desc", "asc"]))
      .then((res) => {
        setLoading(false)
        setModules(res as any);
      })
  }, [setModules, setLoading]);

  useEffect(() => {
    queryModule(props.systemId).then((res) =>
      _.orderBy(res, ["status", "name"], ["desc", "asc"]))
      .then((res) => {
        setLoading(false)
        setModules(res as any);
      })
  }, [setModules, setLoading])

  const removeModule = useCallback(
    (module) => {
      deleteModule(module, props.systemId).then(() => {
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
      updateModule(module, props.systemId).then(load);
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
              { members.map((member: any, index: any) => (
                <Tag key={ index }>{ member }</Tag>
              )) }
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
              <Button onClick={ () => setEditingModule(item) } icon={ <FormOutlined/> }>
                修改
              </Button>
              <Button
                onClick={ () => toggleHiddenModule(item) }
                icon={ item.status === "NORMAL" ? <EyeInvisibleOutlined/> : <EyeOutlined/> }
              >
                { item.status === "NORMAL" ? "隐藏" : "展示" }
              </Button>
              <Button danger onClick={ () => removeModule(item) } icon={ <DeleteOutlined/> }>
                删除
              </Button>
            </Button.Group>
          );
        },
      },
    ];
  }, [removeModule, toggleHiddenModule]);

  const onReverseAll = () => {
    reverseAllModules(props.systemId).then((res) => {
      notification.success({ message: "反转所有模块状态成功！" });
      load();
    });
  };

  const onShowAll = () => {
    showAllModules(props.systemId).then((res) => {
      notification.success({ message: "展示所有模块成功！" });
      load();
    });
  };

  const onHideAll = () => {
    hideAllModules(props.systemId).then((res) => {
      notification.success({ message: "隐藏全部模块成功" });
      load();
    });
  };

  const onRefreshModules = () => {
    queryModuleOptions(props.systemId).then((res) => {
      notification.success({ message: "刷新(重排序)成功！" });
      load();
    });
  };

  const onAutoDefine = () => {
    autoDefineModule(props.systemId).then((res) => {
      notification.success({ message: "自动定义成功！" });
      load();
    });
  };

  return (
    <CollapsibleCard
      className="module-config"
      title="自定义逻辑模块"
      collapsed={ true }
      extra={
        <div>
          <Button onClick={ onReverseAll }>全部反转</Button>
          <Button onClick={ onShowAll }>全部展示</Button>
          <Button onClick={ onHideAll }>全部隐藏</Button>
          <Button onClick={ onRefreshModules }>刷新(重排序)</Button>
          <Tooltip title="从依赖扫描结果中自动定义逻辑模块">
            <Button onClick={ onAutoDefine }>自动定义</Button>
          </Tooltip>
        </div>
      }
    >
      <Table
        bordered
        footer={ () => (
          <Button
            onClick={ () => setEditingModule({ name: "", members: [] }) }
            style={ { width: "100%" } }
            icon={ <PlusOutlined/> }
            type="dashed"
          >
            新增模块
          </Button>
        ) }
        size="small"
        rowKey="id"
        pagination={ false }
        dataSource={ modules }
        loading={ loading }
        columns={ columns }
      />
      <ModuleConfigModal
        systemId={ props.systemId }
        onSuccess={ () => {
          load();
          setEditingModule(undefined);
        } }
        module={ editingModule! }
        onClose={ () => setEditingModule(undefined) }
        visible={ !!editingModule }
      />
    </CollapsibleCard>
  );
}
