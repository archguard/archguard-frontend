import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import cls from "classnames";
import * as React from "react";
import { PropsWithChildren } from "react";
import { useToggle } from "react-use";
import "./index.less";

type FullscreenContainerProps = PropsWithChildren<{
  style?: React.CSSProperties;
  className?: string;
}>;

export default function FullscreenContainer(props: FullscreenContainerProps) {
  const [fullscreen, toggleFullscreen] = useToggle(false);

  return (
    <div className={`fullscreen-container ${props.className}`} style={props.style}>
      <div className={cls("container", { fullscreen })}>
        {props.children}
        {!fullscreen ? (
          <FullscreenOutlined onClick={toggleFullscreen} className="resize" />
        ) : (
          <FullscreenExitOutlined onClick={toggleFullscreen} className="resize" />
        )}
      </div>
    </div>
  );
}
