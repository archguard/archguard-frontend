import React, { useCallback, useState } from "react";
import ServicesMapMapping from "@/pages/servicesMap/ServicesMapMapping";
import { Button, Col, Row, Select } from "antd";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { queryContainerByIds } from "@/api/module/containerService";

function ServicesMap() {
  const [systemInfo] = useSystemList();
  const [ selectedIds, setSelectedIds ] = useState([] as any[])
  const [ services, setServices ] = useState(null)

  const handleChange = useCallback((value: string[]) => {
    setSelectedIds(value)
  }, [setSelectedIds]);

  const createMapping = useCallback(() => {
    if (!selectedIds) {
      return;
    }

    queryContainerByIds(selectedIds).then((res: any[]) => {
      setServices(res)
    })
  }, [selectedIds, setServices]);

  return (<div>
    <p>说明：前端当前支持 Axios、UMI-Request，后端支持 Java/Kotlin + Spring、C# + .Net</p>
    <p>新的语言和框架支持，请移步：<a href="https://github.com/archguard/scanner"
                        target={ "_blank" }>https://github.com/archguard/scanner</a></p>
    { systemInfo?.value &&
      <>
        <Row gutter={ 24 } key="dependence-module">
          <Col span={ 8 }>
            <Select mode="multiple" style={ { width: '100%' } } placeholder="请选择系统" onChange={ handleChange }>
              { systemInfo?.value!.map((system, index) => (
                <Select.Option
                  value={ system.id }
                  key={ `${ system.systemName }_${ index }` }
                >
                  { system.systemName }
                </Select.Option>
              )) }
            </Select>
          </Col>
          <Col span={ 4 }>
            <Button
              type="primary"
              onClick={ () => createMapping() }
              style={ { marginBottom: "16px" } }
            >
              查询
            </Button>
          </Col>
        </Row>
        { services && services.length > 0 && <ServicesMapMapping datasource={services}/> }
      </>
    }
  </div>)
}

export default ServicesMap;
