import { queryProjectOverView } from "@/api/addition/projectOverview";
import { useMount } from "ahooks";
import React, { useState } from "react";

export default function ProjectOverView() {
  const [data, setData] = useState({ codeLines: 0, commitCount: 0, contributors: 0 });

  useMount(() => {
    queryProjectOverView().then((res) => {
      setData(res);
    });
  });

  return (
    <div>
      <p>
        代码行数：<strong>{data.codeLines}</strong> 行
      </p>
      <p>
        提交数：<strong>{data.commitCount}</strong> 次
      </p>
      <p>
        开发人数：<strong>{data.contributors}</strong> 人
      </p>
    </div>
  );
}
