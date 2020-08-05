import { queryMethodDependence } from "@/api/dependence/dependenceGraph";
import ArgsArea from "@/components/ArgsArea";
import InvokeGraph from "@/components/InvokeGraph";
import React, { useEffect, useState } from "react";
import useUrlQuery from "../../../../utils/hooks/use-url-query";
import { buttons, formItems } from "./config";
import { buildMethodTree, generateNodeEdges } from "../utils";
import { ButtonConfig, Validator } from "../../../../models/form";
import { JMethod } from "../../../../models/java";
import { GraphData } from "../../../../models/graph";

enum MethodDependenceType {
  invokes = "invokes",
  callees = "callees",
  callers = "callers",
}

type MethodFormData = {
  deep: number;
  dependenceType: MethodDependenceType;
  className: string;
  methodName: string;
};
function MethodDependence() {
  const query = useUrlQuery();

  const [graphData, setGraphData] = useState<GraphData<JMethod>>({ nodes: [], edges: [] });
  const [className, setClassName] = useState("");
  const [methodName, setMethodName] = useState("");
  const [defaultFormData, setDefaultFormData] = useState({});

  useEffect(() => {
    if (query.className && query.methodName) {
      setDefaultFormData({ deep: 3, dependenceType: "invokes", ...query });
      setGraphData({ nodes: [], edges: [] });
    }
  }, [query]);

  function buttonsMap(button: ButtonConfig) {
    return {
      ...button,
      onClick: (formData: MethodFormData, validate: Validator) =>
        onShowClick({ ...formData }, validate),
    };
  }

  function onShowClick(args: MethodFormData, validate: Validator) {
    if (!validate.isValidate) return;
    return queryMethodDependence(args.className, args.methodName, args.dependenceType, {
      deep: args.deep || null,
    }).then((res) => {
      const tree = buildMethodTree(res);
      const nodeEdges = generateNodeEdges(tree, 3);
      setGraphData(nodeEdges);
      setClassName(args.className);
      setMethodName(args.methodName);
      setDefaultFormData({
        deep: args.deep,
        dependenceType: args.dependenceType,
        methodName: args.methodName,
        className: args.className,
      });
    });
  }

  return (
    <div>
      <div>
        <ArgsArea
          formItems={formItems}
          buttons={buttons.map((item) => buttonsMap(item))}
          defaultFormData={defaultFormData}
        />
        <InvokeGraph
          id="methodDependenceGraph"
          data={graphData}
          title={className + "." + methodName}
          nodeLabel={{
            placeholder: "方法名显示",
            options: [
              { label: "方法名", value: "method" },
              { label: "类名.方法名", value: "class.method" },
              { label: "包名.类名.方法名", value: "package.class.method" },
            ],
            setLabel: (fullName: string, type: string) => {
              if (type === "method") {
                if (fullName.endsWith(".")) return "";
                return fullName.substring(fullName.lastIndexOf(".") + 1);
              }
              if (type === "class.method") {
                const names = fullName.split(".");
                return names.slice(-2).join(".");
              }
              return fullName;
            },
          }}
          showAllSelect={true}
        />
      </div>
    </div>
  );
}

export default MethodDependence;
