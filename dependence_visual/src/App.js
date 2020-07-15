import React, {Component} from "react";

import {BrowserRouter as Router, Route} from "react-router-dom";

import PageLayout from "./components/PageLayout";
import Home from "./pages/Home/Home";
import Dependence from "./pages/Dependence";
import Plsql from "./pages/Plsql";
import PlsqlToKotlin from "./pages/PlsqlToKotlin";
import SystemEvaluation from './pages/SystemEvaluation'
import ProjectScan from './pages/ProjectScan'
import EvaluationReport from './pages/EvaluationReport'
import Help from './pages/Help'
import ModuleDependenceHelp from "./pages/Help/dependence/ModuleCouplingHelp";

class App extends Component {
  render() {
    return (
      <Router>
        <Route
          path="/"
          render={(props) => (
            <PageLayout {...props}>
              <Route exact path="/home" component={Home}/>
              <Route path={["/dependence/:type", "/dependence"]} component={Dependence}/>
              <Route path={["/plsql/:type", "/plsql"]} component={Plsql}/>
              <Route path="/plsql-to-kotlin" component={PlsqlToKotlin}/>
              <Route path="/system-evaluation" component={SystemEvaluation}/>
              <Route path="/project-scan" component={ProjectScan}/>
              <Route path="/evaluation-report" component={EvaluationReport}/>
              <Route exact path="/help" component={Help}/>
              <Route exact path="/help/module-coupling" component={ModuleDependenceHelp}/>
            </PageLayout>
          )}
        />
      </Router>
    );
  }
}

export default App;
