import React from "react";
import {
  queryTestCoverageRateBetween,
  queryTestCoverageTop
} from "api/addition/reports";
import ItemsShow from "components/ItemsShow";

const dmsType = ["line", "branch"];
const scope = [0, 0.4, 0.9];

export default class TestCoverage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      complexityCoverageTop: []
    };
  }

  componentDidMount() {
    // queryTestCoverages().then(res => {
    //   this.setState({ data: transformData(res) });
    // });

    for (let item of dmsType) {
      for (let i = 0; i < scope.length; i++) {
        const left = scope[i];
        const right = i + 1 < scope.length ? scope[i + 1] : undefined;
        queryTestCoverageRateBetween({ left, right, dms: item }).then(res => {
          const data = this.state.data;
          if (!data[item]) {
            data[item] = [];
          }
          data[item].push({ left, right, count: res });
          this.setState({ data });
        });
      }
    }

    queryTestCoverageTop({ n: 5, dms: "complexity" }).then(res => {
      this.setState({ complexityCoverageTop: res });
    });
  }

  render() {
    const data = this.state.data;
    return (
      <div>
        <ItemsShow
          header="Test Coverage"
          dataSource={Object.keys(data)}
          renderItem={item => {
            console.log(
              "sore",
              data[item].sort((a, b) => a.left - b.left)
            );
            return (
              <ItemsShow
                header={item + " coverage"}
                dataSource={data[item].sort((a, b) => a.left < b.left)}
                renderItem={subItem => (
                  <p>
                    {subItem.left * 100 + "%"}~
                    {subItem.right ? subItem.right * 100 + "%" : "100%"}：
                    <strong>{subItem.count}</strong>个文件
                  </p>
                )}
              />
            );
          }}
        />
        <ItemsShow
          header="complexity coverage Top 5"
          dataSource={this.state.complexityCoverageTop}
          renderItem={item => (
            <p>
              {item.itemName}：<strong>{item.coverageRate * 100 + "%"}</strong>
            </p>
          )}
        />
      </div>
    );
  }
}
