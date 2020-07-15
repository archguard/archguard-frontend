import React from "react";
import ProjectInfo from "./components/ProjectInfo";
import ProjectOverView from "./components/ProjectOverView";

import "./Home.css";

// import '../../mock/ProjectInfo'
// import '../../mock/projectOverView'


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <div>
          <h2>项目信息</h2>
          <ProjectInfo />
        </div>
        <div>
          <h2>项目概览</h2>
          <ProjectOverView />
        </div>
      </div>
    );
  }
}
