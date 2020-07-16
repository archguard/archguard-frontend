import { QuestionCircleOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import React, { useMemo } from "react";
import "./list.less";

export default function CouplingList(props) {
  const { data = [], style } = props;

  const columns = useMemo(() => {
    const firstItem = data[0];
    if (firstItem) {
      const props = firstItem.props.map((prop, index) => {
        return {
          title: (
            <Tooltip title={prop.desc}>
              {prop.name} <QuestionCircleOutlined />
            </Tooltip>
          ),
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.props[index].value - b.props[index].value,
          render(_, item) {
            const value = item.props[index].value;
            return value;
          },
        };
      });
      return [
        {
          title: firstItem.label,
          render(_, item) {
            const value = item.shortName || item.name;
            return <Tooltip title={item.name}>{value}</Tooltip>;
          },
        },
        ...props,
      ];
    }
    return [];
  }, [data]);

  return (
    <Table
      className="coupling-list"
      style={style}
      dataSource={data}
      scroll={{ x: true }}
      columns={columns}
      bordered
      size="small"
      pagination={{ position: ["bottomCenter"], hideOnSinglePage: true }}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <div className="nested-list">
            <CouplingList style={{ margin: 0 }} data={record.list} />
          </div>
        ),
        rowExpandable: (record) => record.list && record.list.length > 0,
      }}
    />
  );
}
