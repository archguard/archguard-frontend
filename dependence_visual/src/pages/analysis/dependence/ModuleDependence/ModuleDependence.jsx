import React from "react";
import ModuleConfig from "./components/ModuleConfig";
import ModuleCouplingTree from "./components/ModuleCouplingTree";
import ModuleDependenceGraph from "./components/ModuleDependenceGraph";
import ModuleDependenceTable from "./components/ModuleDependenceTable";
import ModuleTypeSelect from "./components/ModuleTypeSelect";
import "./index.less";

export default function ModuleDependence({ location }) {
  return (
    <div className="module-dependence">
      <ModuleTypeSelect />
      <ModuleConfig />
      <ModuleDependenceGraph />
      <ModuleCouplingTree />
      <ModuleDependenceTable location={location} />
    </div>
  );
}
