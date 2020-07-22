import SyncOutlined from "@ant-design/icons/SyncOutlined";
import { Button, Divider, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import { useAsyncFn, useMount } from "react-use";
import { useHistory } from "umi";
import { queryEvaluationList } from "../../../api/addition/evaluations";

export default function HistoryReport() {
  const [showListNum, setShowListNum] = useState(5);
  const [{ value: data = [] }, load] = useAsyncFn(queryEvaluationList, []);
  const list = useMemo(() => data.slice(0, showListNum), [data]);
  const history = useHistory();

  useMount(load);

  return (
    <div>
      <h2>
        历史评估报告&nbsp;
        <Tooltip title="刷新">
          <SyncOutlined onClick={load} />
        </Tooltip>
      </h2>
      <Divider />
      <div
        style={{
          backgroundColor: "rgba(176,180,180,0.09)",
          padding: "16px",
        }}
      >
        {list.map((item, index) => (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/system-evaluation/report/${item.id}`)}
          >
            <h3>{item.name}</h3>
            <p>{item.createdDate}</p>
          </div>
        ))}
      </div>

      {data.length > showListNum && (
        <div style={{ textAlign: "center" }}>
          <Button type="link" onClick={() => setShowListNum((count) => count + 5)}>
            查看更多
          </Button>
        </div>
      )}
    </div>
  );
}
