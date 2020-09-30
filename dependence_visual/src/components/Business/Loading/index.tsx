import { Spin } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./index.css";

let setLoadingCount: Dispatch<SetStateAction<number>>;

export default function Loading() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoadingCount = setCount;
  }, [setCount]);

  return count > 0 ? (
    <div className="loading-warp">
      <Spin size="large" />
    </div>
  ) : null;
}

export const util = {
  increase() {
    setLoadingCount((count: number) => count + 1);
  },
  reduce() {
    setLoadingCount((count: number) => count - 1);
  },
};
