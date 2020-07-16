import React from "react";
import { queryCodeStyles } from "api/addition/reports";
import ItemsShow from "components/ItemsShow";

export default class CodeStyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    queryCodeStyles().then(res => {
      this.setState({ data: res });
    });
  }

  render() {
    return (
      <div>
        <ItemsShow
          header="代码样式"
          dataSource={this.state.data}
          renderItem={item => (
            <p>
              {item.message}：<strong>{item.count}</strong>个
            </p>
          )}
        />
      </div>
    );
  }
}
