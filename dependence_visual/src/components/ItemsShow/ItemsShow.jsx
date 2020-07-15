import React from "react";

export default function ItemsShow(props) {
  return (
    <div>
      <p>
        <strong>{props.header}</strong>
      </p>
      {props.dataSource.map((item, index) => {
        return <div key={item.id || index}>{props.renderItem(item)}</div>;
      })}
    </div>
  );
}
