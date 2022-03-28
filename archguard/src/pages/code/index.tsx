import React, { useCallback, useEffect, useState } from "react";
import Dependence from "@/pages/dependence";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { Select } from "antd";
import { storage } from "@/store/storage/sessionStorage";

const CodeAnalysis = () => {
  const [systemInfo] = useSystemList();
  const [isInChanging, setIsInChanging] = useState(false);

  const onSystemChange = useCallback((index: number) => {
    setIsInChanging(false)
    let system = systemInfo?.value!.filter((item) => item.id === index)[0]
    if (!!system) {
      storage.setSystemId(system.id);
      storage.setSystemLanguage(system.language);

      // todo: is a dirty fix for old code which no fetch system id
      setTimeout(() => {
        setIsInChanging(true)
      }, 50)
    }
  }, [setIsInChanging]);

  return (
    <div>
      { systemInfo?.value &&
        <>
          <Select
            style={ { width: 150, color: "#000" } }
            bordered={ true }
            showArrow={ true }
            placeholder="请选择系统"
            onChange={ (index) => onSystemChange(index) }
          >
            { systemInfo?.value!.map((system, index) => (
              <Select.Option
                disabled={ system.scanned !== "SCANNED" }
                value={ system.id }
                key={ `${ system.systemName }_${ index }` }
              >
                { system.systemName }
              </Select.Option>
            )) }
          </Select>
          { isInChanging && <Dependence withRouter={ false }/> }
        </>
      }
    </div>
  )
}

export default CodeAnalysis
