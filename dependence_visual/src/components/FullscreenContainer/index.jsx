import {useToggle} from "react-use";
import "./index.less";
import * as React from "react";
import {FullscreenExitOutlined, FullscreenOutlined} from "@ant-design/icons";
import cls from "classname"

export default function FullscreenContainer(props) {
  const [fullscreen, toggleFullscreen] = useToggle(false)

  return <div className="fullscreen-container" style={props.style}>
    <div className={cls("container", {fullscreen})}>
      {props.children}
      {!fullscreen ?
        <FullscreenOutlined onClick={toggleFullscreen} className="resize"/> :
        <FullscreenExitOutlined onClick={toggleFullscreen} className="resize"/>
      }
    </div>
  </div>
}
