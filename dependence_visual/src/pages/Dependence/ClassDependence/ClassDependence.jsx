import React, { useState, useEffect } from "react";
import ArgsArea from "components/ArgsArea";
import InvokeGraph from "components/InvokeGraph";
import { formItems, buttons } from "./config";
import { queryClassDependence } from "api/dependence/dependenceGraph";
import { connect } from "react-redux";

function ClassDependence(props) {
  const { query, configs } = props;

  const [graphData, setGraphData] = useState({});
  const [className, setClassName] = useState("");
  const [defaultFormData, setDefaultFormData] = useState({});

  useEffect(() => {
    if (query.className) {
      setDefaultFormData({ deep: 3, dependenceType: "dependences", ...query });
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
    return queryClassDependence(args.className, args.dependenceType, {
      deep: args.deep || null,
    }).then((res) => {
      setGraphData(res);
      setClassName(args.className);
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
        configs={configs}
        nodeLabel={{
          placeholder: "类名显示",
          options: [
            { label: "类名", value: "class" },
            { label: "包名.类名", value: "package.class" },
          ],
          setLabel: (fullName, type) => {
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

const mapStateToProps = (state) => ({
  configs: state.dependence.config,
});

export default connect(mapStateToProps)(ClassDependence);
