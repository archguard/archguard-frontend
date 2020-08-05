import { queryClassDependence } from "@/api/module/dependenceGraph.ts";
import InvokeGraph from "@/components/InvokeGraph";
import React, { useEffect, useState } from "react";
import useUrlQuery from "../../../../utils/hooks/use-url-query";
import {
  buildClassDependenceTree,
  buildClassInvokesTree,
  buildClassMethodInvokesTree,
  generateNodeEdges,
} from "../utils";
import { GraphData } from "../../../../models/graph";
import { JClass, JMethod } from "../../../../models/java";
import ClassDependenceArgsForm from './ClassDependenceArgsForm'

enum ClassDependenceType {
  dependencies = "dependencies",
  invokes = "invokes",
  methods_callees = "methods_callees",
}

type JItem = JClass | JMethod;

const calculateNodeEdges = (
  dependenceType: ClassDependenceType,
  jclass: JClass,
  deep: number = 3,
): GraphData<JItem> => {
  const buildTreeFunctions: { [key in ClassDependenceType]: Function } = {
    [ClassDependenceType.dependencies]: buildClassDependenceTree,
    [ClassDependenceType.invokes]: buildClassInvokesTree,
    [ClassDependenceType.methods_callees]: buildClassMethodInvokesTree,
  };
  const rootNodes = buildTreeFunctions[dependenceType](jclass);
  const nodeEdges = generateNodeEdges(rootNodes, deep);
  return nodeEdges as GraphData<JItem>;
};

type ClassFormData = {
  deep: number;
  dependenceType: ClassDependenceType;
  className: string;
  module: string;
};

function ClassDependence() {
  const query = useUrlQuery();

  const [graphData, setGraphData] = useState<GraphData<JItem>>({ edges: [], nodes: [] });
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (query.className) {
      setGraphData({ edges: [], nodes: [] });
    }
  }, [query]);

  function onShowClick(args: ClassFormData) {
    return queryClassDependence(args.className, args.dependenceType, {
      deep: args.deep || null,
      module: args.module || null,
    }).then((res) => {
      const nodeEdges = calculateNodeEdges(args.dependenceType, res);
      setGraphData(nodeEdges);
      setClassName(args.className);
    });
  }

  return (
    <div>
      <ClassDependenceArgsForm onFinish={onShowClick}></ClassDependenceArgsForm>
      <InvokeGraph
        id="classDependenceGraph"
        data={graphData}
        title={className}
        nodeLabel={{
          placeholder: "类名显示",
          options: [
            { label: "类名", value: "class" },
            { label: "包名.类名", value: "package.class" },
          ],
          setLabel: (fullName: string, type: string) => {
            if (type === "class") {
              if (fullName.endsWith(".")) return "";
              return fullName.substring(fullName.lastIndexOf(".") + 1);
            }
            return fullName;
          },
        }}
        showAllSelect={true}
      />
    </div>
  );
}

export default ClassDependence;
