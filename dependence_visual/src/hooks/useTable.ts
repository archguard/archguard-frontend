import React, { useState, useEffect } from "react";
import axios from "@/api/axios";

type OptionalArryObj = Array<{ [propName: string]: any; }>;

interface UseTableResult {
  tableProps: {
    dataSource: any[];
    onChange: (val: any) => void;
    pagination: {
      total: number;
      pageSize: number;
      onChange: (page: number) => void;
    };
  };
  search?: {
    onChange: () => void;
  };
}

interface UseTableOptions {
  numberPerPage?: number;
  requestMethods?: 'GET' | 'POST';
  parameter?: {};
  onChange?: (val: any) => void;
}

interface TableData {
  count: number;
  currentPageNumber: number;
  data: OptionalArryObj;
}

export function useTable(url: string, option?: UseTableOptions): UseTableResult {
  const newOption = option || {};
  newOption.numberPerPage = newOption.numberPerPage || 5;
  newOption.requestMethods = newOption.requestMethods || 'GET';
  newOption.parameter = newOption.parameter || {};

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState<OptionalArryObj>([]);

  const getTableData = () => {
    axios<TableData>({
      url,
      method: "GET",
      params: {
        currentPageNumber: newOption.numberPerPage,
        numberPerPage: newOption.numberPerPage,
        ...newOption.parameter
      },
    }).then(({ count, data }) => {
      setTableData(data);
      setCount(count);
    });
  };

  useEffect(() => {
    getTableData();
  }, [currentPageNumber]);

  return {
    tableProps: {
      dataSource: tableData,
      onChange(val) {
        console.log('val: ', val);
        const { onChange = () => { } } = newOption;
        onChange(val);
      },
      pagination: {
        total: count,
        pageSize: newOption.numberPerPage,
        onChange(page: number) {
          setCurrentPageNumber(page);
        }
      }
    },
  };

}