import React from "react";
import ModuleDependenceTable from "./components/ModuleDependenceTable";
import ModuleDependenceGraph from "./components/ModuleDependenceGraph";
import ModuleTypeSelect from "./components/ModuleTypeSelect";

import "./index.less";
import ModuleCouplingTree from "./components/ModuleCouplingTree";
import ModuleConfig from "./components/ModuleConfig";

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
