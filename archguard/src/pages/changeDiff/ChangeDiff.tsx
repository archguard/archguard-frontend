import React, { useCallback, useEffect, useState } from "react";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { Button, Form, Input, Row, Select, Space } from 'antd';
import { useParams } from "umi";
import { useIntl } from "@@/plugin-locale/localeExports";

import { storage } from "@/store/storage/sessionStorage";
import { queryCommitByIds, queryHistory } from "@/api/module/gitFile";
import RelationMap from "@/pages/changeDiff/RelationMap";

const ChangeDiff = () => {
  const { formatMessage } = useIntl();
  const [systemInfo] = useSystemList();
  const [isInChanging, setIsInChanging] = useState(false);
ª  // @ts-ignore
  const [systemId, setSystemId] = useState(useParams().systemId);
  const [commits, setCommits] = useState(null)
  const [relations, setRelations] = useState([])

  const onSystemChange = useCallback((index: number) => {
    setIsInChanging(false)
    let system = systemInfo?.value!.filter((item) => item.id === index)[0]
    if (!!system) {
      storage.setSystemId(system.id);
      storage.setSystemLanguage(system.language);

      setSystemId(system.id)
      queryHistory(String(system.id)).then((res) => {
        setCommits(res as any)
      })

      // todo: is a dirty fix for old code which no fetch system id
      setTimeout(() => {
        setIsInChanging(true)
      }, 50)
    }
  }, [setIsInChanging, setCommits]);

  const queryByCommitId = useCallback((value) => {
    setIsInChanging(true)

    queryCommitByIds(systemId, value.since, value.until).then((res) => {
      setIsInChanging(false)
      setCommits(res as any)
    })
  }, [systemId, setCommits, setRelations])

  useEffect(() => {
    if (!commits) return;

    let results: any[] = []
    // @ts-ignore
    for (let relation of commits) {
      results = results.concat(JSON.parse(relation.relations))
    }

    // @ts-ignore
    setRelations(results)
  }, [commits, setRelations])

  return (
    <div>
      { systemInfo?.value &&
        <>
          <Space direction="vertical" size="middle">

            <Select
              dropdownMatchSelectWidth={true}
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

            { systemId &&
              <Form name="basic" onFinish={ queryByCommitId } autoComplete="off">
                <Row>
                  <Form.Item label={ formatMessage({ id: 'SINCE_COMMIT_ID' }) } name="since">
                    <Input/>
                  </Form.Item>

                  <Form.Item label={ formatMessage({ id: 'UNTIL_COMMIT_ID' }) } name="until">
                    <Input/>
                  </Form.Item>

                  <Form.Item wrapperCol={ { offset: 8, span: 16 } }>
                    <Button type="primary" htmlType="submit">{ formatMessage({ id: 'ANALYSIS' }) }</Button>
                  </Form.Item>
                </Row>
              </Form>
            }
          </Space>

          { isInChanging &&
            <>
              { !!relations && relations.length > 0 &&
                <RelationMap dataSource={ relations } title={ formatMessage({ id: 'CHANGE_DETECT_OVERVIEW' }) }/> }
              { !!commits &&
                // @ts-ignore
                commits.map((commit: any, index) => (
                  <div key={ `commit_${ index }` }>
                    <p> sinceRev: { commit.sinceRev }, untilRev: { commit.untilRev },
                      Function: { commit.packageName }.{ commit.className }</p>
                    {/* "[]".length = 2 */ }
                    { commit.relations.length > 2 &&
                      <RelationMap dataSource={ JSON.parse(commit.relations) } title={ "CALL" }/> }
                  </div>
                ))
              }
            </>
          }
        </>
      }
    </div>
  )
}

export default ChangeDiff
