import React from "react";
import ReactMarkdown from "react-markdown";
import moduleDependence from "./ModuleCouplingHelp.md"
export default class ModuleCouplingHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "help",
    };
  }

  componentDidMount() {
    fetch(moduleDependence)
      .then((res) => res.text())
      .then((text) => this.setState({ source: text }));
  }

  render() {
    return (
      <div>
        <ReactMarkdown source={this.state.source} />
      </div>
    );
  }
}
