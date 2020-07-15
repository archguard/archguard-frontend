import React from "react";
import { queryScatterCommits } from "api/addition/git";

export default class ScatterCommits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commitList: []
    };
  }

  componentDidMount() {
    this.queryScatterCommits(3);
  }

  queryScatterCommits(month) {
    let timeFrom = 0;
    if (month >= 0) {
      const dt = new Date();
      dt.setMonth(dt.getMonth() - month);
      timeFrom = dt.getTime();
    }

    queryScatterCommits({ from: timeFrom, changedEntryCount: 8 }).then(res => {
      this.setState({
        commitList: res.commitLogOutList
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <p>
            <strong>散弹式提交：</strong>
          </p>
        </div>
        <p>
          最近3个月共有 <strong>{this.state.commitList.length}</strong> 次散弹式提交
        </p>
      </div>
    );
  }
}
