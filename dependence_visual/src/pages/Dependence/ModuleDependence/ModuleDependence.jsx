import React from "react";
import ModuleDependenceTable from "./components/ModuleDependenceTable";
import ModuleDependenceGraph from "./components/ModuleDependenceGraph";

import "./ModuleDependence.css";
import ModuleCouplingTree from "./components/ModuleCouplingTree";
import ModuleConfig from "./components/ModuleConfig";

export default class ModuleDependence extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moduleCouplingData: [] };
  }

  render() {
    return (
      <div className="module-dependence">
        <ModuleConfig />
        <ModuleDependenceGraph />
        <ModuleCouplingTree />
        <ModuleDependenceTable location={this.props.location} />
      </div>
    );
  }
}
