import React from "react";
import ModuleConfig from "./components/ModuleConfig";
import ModuleDependenceGraph from "./components/ModuleDependenceGraph";
import ModuleDependenceTable from "./components/ModuleDependenceTable";
import "./index.less";

interface ModuleDependenceProps {
  systemId: number
}

export default function ModuleDependence(props: ModuleDependenceProps) {
  return (
    <div className="module-dependence">
      <ModuleConfig />
      <ModuleDependenceGraph systemId={props.systemId}/>
      <ModuleDependenceTable systemId={props.systemId}/>
    </div>
  );
}
