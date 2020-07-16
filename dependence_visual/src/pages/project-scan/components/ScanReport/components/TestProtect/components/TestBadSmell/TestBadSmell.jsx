import React from "react";
import { queryTestBadSmells } from "api/addition/reports";
import ItemsShow from "components/ItemsShow";

export default class TestBadSmell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    queryTestBadSmells().then(res => {
      this.setState({ data: res });
    });
  }

  render() {
    return (
      <div>
        <ItemsShow
          header="Test Bad Smell"
          dataSource={this.state.data}
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
