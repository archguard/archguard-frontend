import React from "react";
import { queryHotSpot } from "api/addition/git";
import ItemsShow from "components/ItemsShow";

export default class ChangeImpact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotSpotCount: 5,
      hotSpotList: []
    };
  }

  componentDidMount() {
    queryHotSpot({ top: this.state.hotSpotCount }).then(res => {
      this.setState({ hotSpotList: res });
    });
  }

  render() {
    return (
      <div>
        <ItemsShow
          header={"热点文件：Top " + this.state.hotSpotCount}
          dataSource={this.state.hotSpotList}
          renderItem={item => (
            <p>
              {item.path}：<strong>{item.count}</strong>次
            </p>
          )}
        />
      </div>
    );
  }
}
