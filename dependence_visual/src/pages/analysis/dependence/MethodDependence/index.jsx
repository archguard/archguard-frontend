import React, { useState, useEffect } from "react";
import ArgsArea from "@/components/ArgsArea";
import InvokeGraph from "@/components/InvokeGraph";
import { queryMethodDependence } from "@/api/dependence/dependenceGraph";
import { formItems, buttons } from "./config";
import { connect } from "react-redux";

function MethodDependence(props) {
  const { query, configs } = props;

  const [graphData, setGraphData] = useState({});
  const [className, setClassName] = useState("");
  const [methodName, setMethodName] = useState("");
  const [defaultFormData, setDefaultFormData] = useState({});

  useEffect(() => {
    if (query.className && query.methodName) {
      setDefaultFormData({ deep: 3, dependenceType: "invokes", ...query });
      setGraphData({});
    }
  }, [query]);

  function buttonsMap(button) {
    return {
      ...button,
      onClick: (formData, validate) => onShowClick({ ...formData }, validate),
    };
  }

  function onShowClick(args, validate) {
    if (!validate.isValidate) return;
    return queryMethodDependence(args.className, args.methodName, args.dependenceType, {
      deep: args.deep || null,
    }).then((res) => {
      setGraphData(res);
      setClassName(args.className);
      setMethodName(args.methodName);
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
          configs={configs}
          nodeLabel={{
            placeholder: "方法名显示",
            options: [
              { label: "方法名", value: "method" },
              { label: "类名.方法名", value: "class.method" },
              { label: "包名.类名.方法名", value: "package.class.method" },
            ],
            setLabel: (fullName, type) => {
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
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  configs: state.dependence.config,
});

export default connect(mapStateToProps)(MethodDependence);
