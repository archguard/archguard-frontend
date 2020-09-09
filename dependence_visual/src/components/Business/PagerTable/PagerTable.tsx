import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "@/api/axios";

const DEFAULt_NUMBER_PER_PAGE = 5;

interface PagerTableProps {
  url: string;
  parameter?: any;
  numberPerPage?: number;
  countChange: (count: number) => void;
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
  const { columns, url, parameter, numberPerPage = DEFAULt_NUMBER_PER_PAGE, countChange } = props;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState<OptionalArryObj>([]);

  const getTableData = () => {
    axios<TableData>({
      baseURL: "",
      url,
      method: "GET",
      params: { currentPageNumber, numberPerPage, ...parameter },
    }).then(({ count, data }) => {
      setTableData(data);
      setCount(count);
      countChange(count);
    });
  };

  useEffect(() => {
    getTableData();
  }, [currentPageNumber]);

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
        onChange={ (pagination, filters, sorter) => {
          console.log(pagination, filters, sorter)
        } }
      />
    </div>
  );
};
