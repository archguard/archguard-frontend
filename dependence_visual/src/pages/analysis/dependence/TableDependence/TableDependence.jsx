import React from "react";

import TableGraph from "./components/TableGraph";
import UsedTable from "./components/UsedTable";
import UnusedTable from "./components/UnusedTable";

import { csvToJson } from "./utils";

import aCsv from "./csv/a.csv";
import finalCsv from "./csv/final.csv";

export default function TableDependence() {
  const tableData = csvToJson(finalCsv);
  const tableDataWithClass = csvToJson(aCsv);
  return (
    <div>
      <TableGraph data={tableData} />
      <UsedTable data={tableDataWithClass} />
      <UnusedTable data={tableData.filter((item) => item.used == 0)} />
    </div>
  );
}
