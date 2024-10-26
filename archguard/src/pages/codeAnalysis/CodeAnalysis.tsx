import React, { useCallback, useState } from "react";
import Dependence from "@/pages/dependence/Dependence";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { Select } from "antd";
import { storage } from "@/store/storage/sessionStorage";
import { useIntl } from "@@/plugin-locale/localeExports";

const CodeAnalysis = () => {
  const { formatMessage } = useIntl();
  const [systemInfo] = useSystemList();
  const [isInChanging, setIsInChanging] = useState(false);
  const [id, setId] = useState<number | undefined>(undefined);

  const onSystemChange = useCallback((index: number) => {
    setIsInChanging(false)
    let system = systemInfo?.value!.filter((item) => item.id === index)[0]
    if (system) {
      storage.setSystemId(system.id);
      storage.setSystemLanguage(system.language);

      setId(system.id as any)
      // todo: is a dirty fix for old code which no fetch system id
      setTimeout(() => {
        setIsInChanging(true)
      }, 50)
    }
  }, []);

  return (
    <div>
      { systemInfo?.value &&
        <>
          <Select
            style={ { width: 350, color: "#000" } }
            bordered={ true }
            showArrow={ true }
            placeholder={ formatMessage({ id: 'SELECT_SYSTEM' }) }
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
          { isInChanging && id && <Dependence withRouter={ false } systemId={id} /> }
        </>
      }
    </div>
  )
}

export default CodeAnalysis
