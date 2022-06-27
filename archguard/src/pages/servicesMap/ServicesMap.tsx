import React, { useCallback, useState } from "react";
import ServicesMapMapping from "@/pages/servicesMap/ServicesMapMapping";
import { Button, Col, Row, Select } from "antd";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { queryContainerByIds } from "@/api/module/containerService";
import ServicesMapGraph from "@/pages/servicesMap/graph/ServicesMapGraph";
import { urlMapping } from "@/pages/servicesMap/urlMapping";
import { useIntl } from "@@/plugin-locale/localeExports";
import { newLineMessage } from "@/utils/newLineMessage";
import { graphLayoutOptions } from "@/components/Business/InvokeGraph/cytoscapeGraph/components/GraphOperation/config";

function ServicesMap() {
  const { formatMessage } = useIntl();
  const [systemInfo] = useSystemList();
  const [selectedIds, setSelectedIds] = useState([] as any[]);
  const [links, setLinks] = useState([]);
  const [elements, setElements] = useState({ nodes: [], edges: [] });
  const [unmapUrls, setUnmapUrls] = useState([]);

  const handleChange = useCallback((value: string[]) => {
    setSelectedIds(value)
  }, [setSelectedIds]);

  const createMapping = useCallback(() => {
    if (!selectedIds) {
      return;
    }

    setElements({ nodes: [], edges: [] });

    queryContainerByIds(selectedIds).then((res: any[]) => {
      let unmap: any[] = [];
      let elms = {
        nodes: [],
        edges: [],
      };

      let data = urlMapping(res, unmap, elms);

      setElements(elms);
      setUnmapUrls(unmap as any);
      setLinks(data as any);
    });
  }, [selectedIds, setLinks, setElements, setUnmapUrls]);

  return (
    <div>
      <p>{newLineMessage(formatMessage, "SERVICES_MAP_TIPS")}
        <a href="https://github.com/archguard/archguard" target={"_blank"} rel="noreferrer">
          https://github.com/archguard/archguard
        </a>
      </p>

      {systemInfo?.value && (
        <>
          <Row gutter={24} key="dependence-module">
            <Col span={8} key="col-1">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder={formatMessage({ id: "SELECT_SYSTEM" })}
                onChange={handleChange}
                options={systemInfo?.value!.map((item) => ({
                  label: item.systemName,
                  key: `system-${item.id}`,
                  value: item.id,
                })) as any[]}
              />
            </Col>
            <Col span={4} key="col-2">
              <Button
                type="primary"
                onClick={() => createMapping()}
                style={{ marginBottom: "16px" }}
              >
                {formatMessage({ id: "QUERY" })}
              </Button>
            </Col>
          </Row>
          {elements && elements.nodes && elements.nodes.length > 0 && (
            <ServicesMapGraph datasource={elements} />
          )}
          {links && links.length > 0 && (
            <ServicesMapMapping datasource={links} unmapUrls={unmapUrls} />
          )}
        </>
      )}
    </div>
  );
}

export default ServicesMap;
