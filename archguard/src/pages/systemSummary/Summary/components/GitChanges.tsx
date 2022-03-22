import { CirclePacking } from '@ant-design/charts';
import { getGitPathChanges } from "@/api/module/gitFile";
import { useEffect, useState } from "react";
import React from 'react';

function GitChanges() {
  const [data, setData] = useState([]);

  function hierarchy(data: any, delimiter = "/") {
    let root;
    const map = new Map();
    data.forEach(function find(data: any) {
      const { name } = data;
      if (map.has(name)) return map.get(name);
      const i = name.lastIndexOf(delimiter);
      map.set(name, data);
      if (i >= 0) {
        let found = find({ name: name.substring(0, i), children: []});
        if (found.children) {
          found.children.push(data);
        } else {
          return data
        }

        data.name = name.substring(i + 1);
        data.originName = name.substring(name.indexOf((delimiter)) + 1);
      } else {
        root = data;
      }
      return data;
    });

    return root;
  }

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    getGitPathChanges().then((res) => {
      setData(hierarchy(res) as any);
    });
  };

  const config: any = {
    autoFit: true,
    padding: 0,
    width: 600,
    height: 600,
    data,
    sizeField: 'r',
    // 自定义颜色
    colorField: 'r',
    color: 'rgb(252, 253, 191)-rgb(231, 82, 99)-rgb(183, 55, 121)',
    // 自定义样式
    pointStyle: {
      stroke: 'rgb(183, 55, 121)',
      lineWidth: 0.5,
    },
    label: false,
    legend: false,
    drilldown: {
      enabled: true,
      breadCrumb: {
        position: 'top-left',
      },
    },
  };

  return <CirclePacking {...config} />;
}

export default GitChanges;
