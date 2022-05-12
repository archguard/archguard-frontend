import React from "react";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { useIntl } from 'umi';


function InteractiveAnalysis() {
  const { formatMessage } = useIntl();
  const [systemInfo] = useSystemList();

  return (<div>
  </div>)
}

export default InteractiveAnalysis;
