import { exportJsonToExcel } from "@/utils/file-utils";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Table, Tooltip } from "antd";
import { SortOrder } from "antd/lib/table/interface";
import React, { useMemo, useState } from "react";
import "./list.less";
import { queryPackageCoupling, queryClassCoupling } from "@/api/module/metric";
import { packageMapping, classMapping, mappingProps } from "./report";

export interface CouplingRecord {
  key: string;
  label: string;
  fullName: string;
  name: string;
  shortName?: string;
  moduleId: string;
  props: {
    desc: string;
    name: string;
    value: any;
    key: string;
  }[];
  packages?: CouplingRecord[];
  classess?: CouplingRecord[];
}

interface CouplingListProps {
  data?: CouplingRecord[];
  style?: React.CSSProperties;
  exportable?: boolean;
}

export default function CouplingList(props: CouplingListProps) {
  const { data = [], style, exportable = false } = props;

  const [records, setRecords] = useState(data);

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
            return value;
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

  const lazyLoadPackageMetric = (record: CouplingRecord) => {
    if (
      record.packages &&
      record.packages.length > 0 &&
      record.packages.every((pkg) => !pkg.props || pkg.props.every((prop) => !prop.value))
    ) {
      const packageNames = record.packages!.map((p) => p.fullName);
      queryPackageCoupling(packageNames).then((res) => {
        record.packages!.forEach((p) => {
          const packageName = p.fullName.replace(`${record.moduleId}.`, "");
          const metric = res.find((x) => x.packageVO.packageName === packageName);
          if (metric) {
            p.props = mappingProps(metric, packageMapping);
          }
        });
        setRecords([...records]);
      });
    }
  };

  const lazyLoadClassMetric = (record: CouplingRecord) => {
    if (
      record.classess &&
      record.classess.length > 0 &&
      record.classess.every((c) => !c.props || c.props.every((prop) => !prop.value))
    ) {
      queryClassCoupling(record.moduleId, record.fullName.replace(`${record.moduleId}.`, "")).then(
        (res) => {
          record.classess!.forEach((c) => {
            const metric = res.find((x) => x.jclassVO.fullName === c.fullName);
            if (metric) {
              c.props = mappingProps(metric, classMapping);
            }
          });
          setRecords([...records]);
        },
      );
    }
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
              <CouplingList style={{ margin: 0 }} data={record.packages} />
            )}
            {record.classess && record.classess.length > 0 && (
              <CouplingList style={{ margin: 0 }} data={record.classess} />
            )}
          </div>
        ),
        rowExpandable: (record) => {
          return (
            (record.packages ? record.packages.length > 0 : false) ||
            (record.classess ? record.classess.length > 0 : false)
          );
        },
        onExpand: (expanded, record) => {
          if (expanded) {
            lazyLoadPackageMetric(record);

            lazyLoadClassMetric(record);
          }
        },
      }}
    />
  );
}
