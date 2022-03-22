import React, {useState, useEffect} from "react";
import {Table} from "antd";
import {TablePaginationConfig, ExpandableConfig} from "antd/lib/table/interface";
import axios from "@/api/axios";
import {genID} from "@/utils/utils";
import { FilterValue } from "antd/lib/table/interface";

const DEFAULT_NUMBER_PER_PAGE = 10;

interface PagerTableProps {
  url: string;
  parameter?: any;
  numberPerPage?: number;
  expandable?: ExpandableConfig<any>;
  onSortChange?: (sorter: any) => void;
  onFilterChange?: (filter: Record<string, FilterValue | null>) => void;
  onPaginationChange?: (pagination: TablePaginationConfig) => void;
  onDataChange: (data: PagerTableData) => void;
  columns: Array<{
    title: string;
    dataIndex: string;
    key: string;
  }>;
}

type OptionalArryObj = Array<{ [propName: string]: any }>;

export interface PagerTableData {
  count: number;
  currentPageNumber: number;
  data: OptionalArryObj;

  [key: string]: any;
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
    numberPerPage = DEFAULT_NUMBER_PER_PAGE,
    onDataChange,
    onSortChange,
    onFilterChange,
    onPaginationChange,
    parameter,
  } = props;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState<OptionalArryObj>([]);

  const getTableData = () => {
    axios<PagerTableData>({
      baseURL: "",
      url,
      method: "POST",
      data: {
        currentPageNumber: currentPageNumber,
        numberPerPage: numberPerPage,
        module: parameter?.module,
        className: parameter?.className,
        name: parameter?.name,
        packageName: parameter?.packageName,
      },
    }).then((res) => {
      setTableData(autoAddUniqueKeys(res.data));
      setCount(res.count);
      onDataChange(res);
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
        scroll={{x: true}}
        pagination={{
          total: count,
          pageSize: numberPerPage,
          onChange: (page) => {
            setCurrentPageNumber(page);
          },
        }}
        dataSource={tableData}
        onChange={(pagination, filters, sorter, {action}) => {
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
