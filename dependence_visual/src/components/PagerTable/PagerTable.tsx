import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "@/api/axios";

const DEFAULt_NUMBER_PER_PAGE = 5;

interface PagerTableProps {
  url: string;
  numberPerPage?: number;
  change: (count: number) => void;
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

export const PagerTable = (props: PagerTableProps) => {
  const { columns, url, numberPerPage = DEFAULt_NUMBER_PER_PAGE, change } = props;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState<OptionalArryObj>([]);

  const getTableData = () => {
    axios<TableData>({
      baseURL: "",
      url,
      method: "GET",
      params: { currentPageNumber, numberPerPage },
    }).then((res) => {
      setTableData(res.data);
      setCount(res.count);
      change(res.count);
    });
  };

  useEffect(() => {
    getTableData();
  }, [currentPageNumber]);

  return (
    <div className="pager-table">
      <Table
        columns={columns}
        pagination={{
          total: count,
          pageSize: numberPerPage,
          onChange: (page) => {
            setCurrentPageNumber(page);
          },
        }}
        dataSource={tableData}
      />
    </div>
  );
};
