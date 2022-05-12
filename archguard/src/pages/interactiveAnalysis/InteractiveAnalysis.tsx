import React from "react";
import { useIntl } from 'umi';
import CoreEditor from './coreEditor/CoreEditor';


function InteractiveAnalysis() {
  const { formatMessage } = useIntl();

  return (<div>
    <CoreEditor />
  </div>)
}

export default InteractiveAnalysis;
