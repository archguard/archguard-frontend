import React from "react";
import Highlighter from 'react-highlight-words';
import { Link } from "react-router-dom";
import { Tooltip, Input, Space, Button } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import * as _ from 'lodash'
import { FilterDropdownProps, Key } from 'antd/lib/table/interface';
import { storage } from '@/store/storage/sessionStorage'

export type methodDependency = {
  caller: method;
  callee: method;
};

type Clazz = {
  classType: string;
  fullName: string;
  interface: boolean;
  module: string;
  name: string;
  type: string;
};

type method = {
  name: string;
  fullname: string;
  clazz: Clazz;
  argumentTypes: string[];
  returnType: string;
};

let searchText: Key = ''
let searchedColumn: string = ''
let searchInput: Input | null = null

const getEndString = (value?: string): string => {
  if (!value) return ''
  return value.split(".").slice(-1).toString()
}

const projectId = storage.getProjectId()

const getColumnSearchProps = (
  title: string,
  dataIndex: string | string[],
  renderCallback: (text: string, record: methodDependency, isHighlight: boolean) => void) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={node => { searchInput = node }}
        placeholder={`search ${title}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, title)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, title)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          搜索
        </Button>
        <Button onClick={() => handleReset(clearFilters!)} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value: string, record: any) => {
    const label = _.get(record, dataIndex)
    const isIncludes = (label: string, value: string) => {
      if (label && value) {
        return label.toLowerCase().includes(value.toLowerCase())
      }
      return false
    }
    return isIncludes(label, value);
  },
  onFilterDropdownVisibleChange: (visible: boolean) => {
    if (visible) {
      setTimeout(() => searchInput?.select());
    }
  },
  render: (text: string, record: methodDependency) => renderCallback(text, record, searchedColumn === title)
});

const handleSearch = (selectedKeys: Key[], confirm: () => void, dataIndex: string) => {
  confirm();
  searchText = selectedKeys[0]
  searchedColumn = dataIndex
};

const handleReset = (clearFilters: () => void) => {
  clearFilters();
  searchText = ''
  searchedColumn = ''
  searchInput = null
};

const renderHighlighter = (text: string) => (
  <Highlighter
    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    searchWords={[searchText.toString()]}
    autoEscape
    textToHighlight={getEndString(text)}
  />)

const classColumn = (dataIndex: string) => {
  const classColumnRender = (text: string, record: methodDependency, isHighlight: boolean) => {
    const method = dataIndex === "caller" ? record.caller : record.callee;
    return (
      <Tooltip title={text}>
        <Link
          to={{
            pathname: `/${projectId}/analysis/dependence/class`,
            search:
              "className=" +
              text +
              "&dependenceType=dependencies" +
              "&module=" +
              method.clazz.module,
          }}
        >
          {isHighlight ? renderHighlighter(text) : getEndString(text)}
        </Link>
      </Tooltip>
    )
  }
  const column = {
    title: "class",
    dataIndex: [dataIndex, "clazz", "name"],
    ...getColumnSearchProps('class', [dataIndex, 'clazz', 'name'], classColumnRender),
  };
  return column;
};

const methodColumn = (dataIndex: string) => {
  const methodColumnRender = (text: string, record: methodDependency, isHighlight: boolean) => {
    const method = dataIndex === "caller" ? record.caller : record.callee;
    return (
      <Link
        to={{
          pathname: `/${projectId}/analysis/dependence/method`,
          search:
            "className=" +
            method.clazz.name +
            "&methodName=" +
            method.name +
            "&dependenceType=invokes" +
            "&module=" +
            method.clazz.module,
        }}
      >
        {isHighlight ? renderHighlighter(text) : getEndString(text)}
      </Link>
    );
  }
  const column = {
    title: "method",
    dataIndex: [dataIndex, "name"],
    ...getColumnSearchProps('method', [dataIndex, 'name'], methodColumnRender)
  };
  return column;
};

const argumentColumn = (dataIndex: String) => {
  const column = {
    title: "argument",
    dataIndex: [dataIndex, "argumentTypes"],
    render: (text: string[]) => {
      return text.map((arg) => arg.split(".").slice(-1).join(', '));
    },
  };
  return column;
};

const columns = [
  {
    title: "caller",
    children: [classColumn("caller"), methodColumn("caller"), argumentColumn("caller")],
  },
  {
    title: "callee",
    children: [classColumn("callee"), methodColumn("callee"), argumentColumn("callee")],
  },
];

export default columns;
