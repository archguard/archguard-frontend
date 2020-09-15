import { useState, useEffect } from "react";
import axios from "@/api/axios";

type OptionalArryObj = Array<{ [propName: string]: any; }>;

interface UseTableResult {
  tableProps: {
    dataSource: any[];
    pagination: {
      total: number;
      pageSize: number;
      onChange: (page: number) => void;
    };
  };
  // search?: {
  //   onChange: () => void;
  // };
}

interface OnTableChangeParams {
  tableData: any[];
  total: number;
}

interface UseTableOptions {
  numberPerPage?: number;
  requestMethod?: 'GET' | 'POST';
  params?: {};
  onTableDataChange?: (val: OnTableChangeParams) => void;
}

interface TableData {
  count: number;
  currentPageNumber: number;
  data: OptionalArryObj;
}

// 使用示例 <Table columns={columns} rowKey="id" {...tableProps} />

export function useTable(url: string, option?: UseTableOptions): UseTableResult {
  option = option ?? {};
  const { numberPerPage = 5, requestMethod = 'GET', params = {}, ...resetOptions } = option;

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState<OptionalArryObj>([]);

  useEffect(() => {
    const getTableData = () => {
      axios<TableData>({
        url,
        method: requestMethod,
        params: {
          currentPageNumber,
          numberPerPage: numberPerPage,
          ...params
        },
      }).then(({ count, data }) => {
        if (resetOptions.onTableDataChange) {
          resetOptions.onTableDataChange({
            tableData: data,
            total: count
          });
        }
        setTableData(data);
        setCount(count);
      });
    };

    getTableData();
  }, [currentPageNumber]);

  return {
    tableProps: {
      dataSource: tableData,
      pagination: {
        total: count,
        pageSize: numberPerPage,
        onChange(page: number) {
          setCurrentPageNumber(page);
        }
      }
    },
  };
}