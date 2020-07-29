import { queryClassDependence } from "@/api/dependence/dependenceGraph";
import ArgsArea from "@/components/ArgsArea";
import InvokeGraph from "@/components/InvokeGraph";
import React, { useEffect, useState } from "react";
import useUrlQuery from "../../../../utils/hooks/use-url-query";
import { buttons, formItems } from "./config";
import {
  buildClassDependenceTree,
  buildClassInvokesTree,
  buildClassMethodInvokesTree,
  generateNodeEdges,
  JClass,
} from "../utils";

enum DependenceType {
  dependencies = "dependencies",
  invokes = "invokes",
  methods_callees = "methods_callees",
}

const calculateNodeEdges = (dependenceType: DependenceType, jclass: JClass) => {
  const buildTreeFunctions: { [key in DependenceType]: Function } = {
    [DependenceType.dependencies]: buildClassDependenceTree,
    [DependenceType.invokes]: buildClassInvokesTree,
    [DependenceType.methods_callees]: buildClassMethodInvokesTree,
  };
  const rootNodes = buildTreeFunctions[dependenceType](jclass);
  const nodeEdges = generateNodeEdges(rootNodes);
  return nodeEdges;
};

type ButtonConfig = {
  text: string;
  id: string;
  type: string;
  span: number;
};

type Validator = {
  isValidate: boolean;
};

type ClassFormData = {
  deep: number;
  dependenceType: DependenceType;
  className: string;
};

function ClassDependence() {
  const query = useUrlQuery();

  const [graphData, setGraphData] = useState({});
  const [className, setClassName] = useState("");
  const [defaultFormData, setDefaultFormData] = useState({});

  useEffect(() => {
    if (query.className) {
      setDefaultFormData({ deep: 3, dependenceType: "dependencies", ...query });
      setGraphData({});
    }
  }, [query]);

  function buttonsMap(button: ButtonConfig) {
    return {
      ...button,
      onClick: (formData: ClassFormData, validate: Validator) =>
        onShowClick({ ...formData }, validate),
    };
  }

  function onShowClick(args: ClassFormData, validate: Validator) {
    if (!validate.isValidate) return;
    return queryClassDependence(args.className, args.dependenceType, {
      deep: args.deep || null,
    }).then((res) => {
      const nodeEdges = calculateNodeEdges(args.dependenceType, res);
      setGraphData(nodeEdges);
      setClassName(args.className);
      setDefaultFormData({
        deep: args.deep,
        className: args.className,
        dependenceType: args.dependenceType,
      });
    });
  }

  return (
    <div>
      <ArgsArea
        formItems={formItems}
        buttons={buttons.map((item) => buttonsMap(item))}
        defaultFormData={defaultFormData}
      />
      <InvokeGraph
        id="classDependenceGraph"
        data={graphData}
        title={className}
        deep={3}
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
      />
    </div>
  );
}

export default ClassDependence;
