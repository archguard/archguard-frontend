import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { TablePaginationConfig } from "antd/lib/table/interface";
import axios from "@/api/axios";

const DEFAULt_NUMBER_PER_PAGE = 5;

interface PagerTableProps {
  url: string;
  parameter?: any;
  numberPerPage?: number;
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

export const BuPagerTable = (props: PagerTableProps) => {
  const {
    columns,
    url,
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
      setTableData(data);
      setCount(count);
      onCountChange(count);
    });
  };

  useEffect(() => {
    getTableData();
  }, [currentPageNumber]);

  useEffect(() => {
    getTableData();
  }, [props.parameter]);

  return (
    <div className="pager-table">
      <Table
        columns={columns}
        rowKey="id"
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
              return onPaginationChange && onPaginationChange(pagination);
            case "filter":
              return onFilterChange && onFilterChange(filters);
            case "sort":
              return onSortChange && onSortChange(sorter);
          }
        }}
      />
    </div>
  );
};
