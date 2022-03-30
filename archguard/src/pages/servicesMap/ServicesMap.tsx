import React, { useCallback, useState } from "react";
import ServicesMapMapping from "@/pages/servicesMap/ServicesMapMapping";
import { Button, Col, Row, Select } from "antd";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { queryContainerByIds } from "@/api/module/containerService";
import ServicesMapGraph from "@/pages/servicesMap/graph/ServicesMapGraph";
import { urlMapping } from "@/pages/servicesMap/urlMapping";

function ServicesMap() {
  const [ systemInfo ] = useSystemList();
  const [ selectedIds, setSelectedIds ] = useState([] as any[])
  const [ links, setLinks ] = useState([])
  const [ elements, setElements ] = useState({ nodes: [], edges: [] })
  const [ unmapUrls, setUnmapUrls ] = useState([])

  const handleChange = useCallback((value: string[]) => {
    setSelectedIds(value)
  }, [setSelectedIds]);

  const createMapping = useCallback(() => {
    if (!selectedIds) {
      return;
    }

    setElements({ nodes: [], edges: [] })

    queryContainerByIds(selectedIds).then((res: any[]) => {
      let unmap: any[] = [];
      let elms = {
        nodes: [],
        edges: []
      };

      let data = urlMapping(res, unmap, elms)

      setElements(elms)
      setUnmapUrls(unmap as any)
      setLinks(data as any)
    })
  }, [selectedIds, setLinks, setElements, setUnmapUrls]);

  return (<div>
    <p>API 消费端：前端 Axios、UMI-Request，后端：Java Spring + RestTemplate、Kotlin Spring + RestTemplate </p>
    <p>API 生产端：支持 Java/Kotlin + Spring、C# + .Net</p>
    <p>新的语言和框架支持，请移步：
      <a href="https://github.com/archguard/scanner" target={ "_blank" } rel="noreferrer">https://github.com/archguard/scanner</a>
    </p>

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
        { elements && elements.nodes && elements.nodes.length > 0 && <ServicesMapGraph datasource={elements}/> }
        { links && links.length > 0 && <ServicesMapMapping datasource={links} unmapUrls={unmapUrls}/> }
      </>
    }
  </div>)
}

export default ServicesMap;
