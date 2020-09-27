import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { TablePaginationConfig, ExpandableConfig } from "antd/lib/table/interface";
import axios from "@/api/axios";
import { genID } from "@/utils";

const DEFAULt_NUMBER_PER_PAGE = 5;

interface PagerTableProps {
  url: string;
  parameter?: any;
  numberPerPage?: number;
  expandable?: ExpandableConfig<any>;
  onSortChange?: (sorter: any) => void;
  onFilterChange?: (filter: Record<string, (string | number)[] | null>) => void;
  onPaginationChange?: (pagination: TablePaginationConfig) => void;
  onCountChange: (count: number) => void;
  columns: Array<{
    title: string;
    dataIndex: string;
    key: string;
  }>;
}

type OptionalArryObj = Array<{ [propName: string]: any }>;

interface TableData {
  count: number;
  currentPageNumber: number;
  data: OptionalArryObj;
}

const autoAddUniqueKeys = (dataList: OptionalArryObj) => {
  return dataList.map((data) => {
    if (!data.id) {
      data.id = genID();
    }

    return data;
  });
};

export const BuPagerTable = (props: PagerTableProps) => {
  const {
    columns,
    url,
    expandable,
    numberPerPage = DEFAULt_NUMBER_PER_PAGE,
    onCountChange,
    onSortChange,
    onFilterChange,
    onPaginationChange,
  } = props;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState<OptionalArryObj>([]);

  const getTableData = () => {
    axios<TableData>({
      baseURL: "",
      url,
      method: "GET",
      params: { currentPageNumber, numberPerPage, ...props.parameter },
    }).then(({ count, data }) => {
      setTableData(autoAddUniqueKeys(data));
      setCount(count);
      onCountChange(count);
    });
  };

  useEffect(() => {
    getTableData();
  }, [currentPageNumber, props.parameter]);

  return (
    <div className="pager-table">
      <Table
        columns={columns}
        rowKey="id"
        expandable={expandable}
        pagination={{
          total: count,
          pageSize: numberPerPage,
          onChange: (page) => {
            setCurrentPageNumber(page);
          },
        }}
        dataSource={tableData}
        onChange={(pagination, filters, sorter, { action }) => {
          switch (action) {
            case "paginate":
              return onPaginationChange?.(pagination);
            case "filter":
              return onFilterChange?.(filters);
            case "sort":
              return onSortChange?.(sorter);
          }
        }}
      />
    </div>
  );
};
