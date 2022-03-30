import { exportJsonToExcel } from "@/utils/utils";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Table, Tooltip } from "antd";
import { SortOrder } from "antd/lib/table/interface";
import React, { useMemo, useState, useEffect } from "react";
import "./list.less";
import { Typography } from "antd";

export interface CouplingRecord {
  key: string;
  label: string;
  fullName: string;
  name: string;
  moduleId: string;
  shortName?: string;
  props: {
    desc: string;
    name: string;
    value: any;
    key: string;
    qualified: boolean;
  }[];
  packages?: CouplingRecord[];
  classess?: CouplingRecord[];
}

interface CouplingListProps {
  data?: CouplingRecord[];
  style?: React.CSSProperties;
  exportable?: boolean;
  onExpand: (expanded: boolean, record: CouplingRecord) => void;
}

export default function CouplingList(props: CouplingListProps) {
  const { data = [], style, exportable = false, onExpand } = props;

  const [records, setRecords] = useState(data);

  useEffect(() => {
    setRecords(data);
  }, [data]);

  const { Text } = Typography;

  const columns = useMemo(() => {
    const firstItem = records[0];
    if (firstItem) {
      const props = firstItem.props.map((prop, index) => {
        return {
          title: (
            <Tooltip title={prop.desc}>
              <div>
                {prop.name} <QuestionCircleOutlined />
              </div>
            </Tooltip>
          ),
          sortDirections: ["descend", "ascend"] as SortOrder[],
          sorter(a: CouplingRecord, b: CouplingRecord) {
            return a.props[index].value - b.props[index].value;
          },
          render(_: any, item: CouplingRecord) {
            const value = item.props[index].value;
            const qualified = item.props[index].qualified;

            return <Text type={qualified ? undefined : "danger"}>{value}</Text>;
          },
        };
      });
      return [
        {
          title: firstItem.label,
          render(_: any, item: CouplingRecord) {
            const value = item.shortName ?? item.name;
            return (
              <Tooltip title={item.name}>
                <div>{value}</div>
              </Tooltip>
            );
          },
        },
        ...props,
      ];
    }
    return [];
  }, [records]);

  const exportExcel = () => {
    exportJsonToExcel(
      data.map((record) => {
        const props: { [key: string]: any } = {};
        record.props.forEach((p) => (props[p.key] = p.value));
        return { name: record.name, ...props };
      }),
      `coupling_${Date.now()}.xlsx`,
    );
  };

  return (
    <Table
      className="coupling-list"
      style={style}
      title={
        exportable
          ? () => {
              return (
                <div style={{ textAlign: "right" }}>
                  <Button onClick={() => exportExcel()}>导出到Excel</Button>
                </div>
              );
            }
          : undefined
      }
      dataSource={records}
      showSorterTooltip={false}
      scroll={{ x: true }}
      columns={columns}
      bordered
      size="small"
      pagination={{ position: ["bottomCenter"], hideOnSinglePage: true }}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <div className="nested-list">
            {record.packages && record.packages.length > 0 && (
              <CouplingList style={{ margin: 0 }} data={record.packages} onExpand={onExpand} />
            )}
            {record.classess && record.classess.length > 0 && (
              <CouplingList style={{ margin: 0 }} data={record.classess} onExpand={onExpand} />
            )}
          </div>
        ),
        rowExpandable: (record) => {
          return (
            (record.packages ? record.packages.length > 0 : false) ||
            (record.classess ? record.classess.length > 0 : false)
          );
        },
        onExpand: onExpand,
      }}
    />
  );
}
