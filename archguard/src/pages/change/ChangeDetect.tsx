import React, { useCallback, useState } from "react";
import useSystemList from "@/store/global-cache-state/useSystemList";
import { Button, Select } from "antd";
import { storage } from "@/store/storage/sessionStorage";
import { DatePicker } from 'antd';
import { queryCommitByRanges } from "@/api/module/gitFile";
import { useParams } from "umi";

const { RangePicker } = DatePicker;

const ChangeDetect = () => {
  const [systemInfo] = useSystemList();
  const [isInChanging, setIsInChanging] = useState(false);
  // @ts-ignore
  const [systemId, setSystemId] = useState(useParams().systemId);
  const [timeRange, setTimeRange] = useState({
    startTime: "",
    endTime: ""
  });
  const [commits, setCommits] = useState([])

  // @ts-ignore
  const changeTime = useCallback((date, dateString) => {
    setTimeRange({
      startTime: (date[0].unix() * 1000).toString(),
      endTime: (date[1].unix() * 1000).toString(),
    })
  }, [setTimeRange]);

  const onSystemChange = useCallback((index: number) => {
    setIsInChanging(false)
    let system = systemInfo?.value!.filter((item) => item.id === index)[0]
    if (!!system) {
      storage.setSystemId(system.id);
      storage.setSystemLanguage(system.language);

      setSystemId(system.id)
      // todo: is a dirty fix for old code which no fetch system id
      setTimeout(() => {
        setIsInChanging(true)
      }, 50)
    }
  }, [setIsInChanging]);

  const queryChange = useCallback(() => {
    queryCommitByRanges(systemId, timeRange.startTime, timeRange.endTime).then((res) => {
      setCommits(res)
    })
  }, [systemId, timeRange])

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

          <RangePicker showTime onChange={ (date, dateString) => changeTime(date, dateString) }/>
          <Button type="primary" onClick={ () => queryChange() } disabled={ timeRange.startTime === "" }>
            确定
          </Button>

          <>
            { commits.map((commit) => (
              <p>{ commit }</p>
            ))
            }
          </>
        </>
      }
    </div>
  )
}

export default ChangeDetect
