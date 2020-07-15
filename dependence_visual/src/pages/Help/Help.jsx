import React from "react";
import ReactMarkdown from "react-markdown";
import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import help from "./help.md";

export default class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "help",
    };
  }

  componentDidMount() {
    fetch(help)
      .then((res) => res.text())
      .then((text) => this.setState({ source: text }));
  }

  render() {
    return (
      <div>
        <MarkdownNavbar source={this.state.source} />
        <ReactMarkdown source={this.state.source} />
      </div>
    );
  }
}
