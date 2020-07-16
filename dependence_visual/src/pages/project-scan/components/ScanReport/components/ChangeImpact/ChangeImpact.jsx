import React from "react";
import { Divider } from "antd";
import HotSpot from "./components/HotSpot";
import ScatterCommits from './components/ScatterCommits'

// import "../../../../mock/git";

export default function ChangeImpact() {
  return (
    <div>
      <p><strong>发散式变化：xxx</strong></p>
      <Divider />
      <ScatterCommits />
      <Divider />
      <HotSpot />

    </div>
  );
}
