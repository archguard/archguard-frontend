import React from "react";
import ModuleConfig from "./components/ModuleConfig";
import ModuleDependenceGraph from "./components/ModuleDependenceGraph";
import ModuleDependenceTable from "./components/ModuleDependenceTable";
import "./index.less";

export default function ModuleDependence({ location }: any) {
  return (
    <div className="module-dependence">
      <ModuleConfig />
      <ModuleDependenceGraph />
      <ModuleDependenceTable location={location} />
    </div>
  );
}
