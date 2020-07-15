import React from "react";
import { queryBadSmells } from "api/addition/reports";
import ItemsShow from "components/ItemsShow";

export default class BadSmell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badSmellList: []
    };
  }

  componentDidMount() {
    queryBadSmells().then(res => {
      this.setState({ badSmellList: res });
    });
  }

  render() {
    return (
      <div>
        <ItemsShow
          header="Bad Smell"
          dataSource={this.state.badSmellList}
          renderItem={item => (
            <p>
              {item.type}：<strong>{item.size}</strong>个
            </p>
          )}
        />
      </div>
    );
  }
}
