import React, { useCallback, useEffect, useState } from "react";
import mermaid from "mermaid";
import { Item, Menu, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import mermaidExport from "@/pages/interactiveAnalysis/block/graph/mermaidExport";

const MENU_ID = "mermaid-menu";

interface MermaidProps {
  definition: string;
  key: string;
}

function Mermaid(props: MermaidProps) {
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const id = `mermaid-${props.key}`;
  const ref = React.useRef({} as any);
  const theme = useState("default");
  // const [mode] = useColorMode()
  // const theme = mode === 'dark' ? 'dark' : 'default'

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme,
    } as any);
  }, [theme]);

  useEffect(() => {
    if (ref.current) {
      mermaid.mermaidAPI.render(id, props.definition, (result) => {
        ref.current.innerHTML = result;
      });
    }
  }, [theme, props.definition]);

  function handleContextMenu(event: any) {
    event.preventDefault();
    show(event, {
      props: {
        key: "value",
      },
    });
  }

  const exportSvg = useCallback(({ event }) => {
    mermaidExport(ref.current)

    event.stopPropagation();
    event.preventDefault();
  }, [ref])

    return (
    <>
      <div key="faux" id={id} />
      <div key="preview" ref={ref} onContextMenu={handleContextMenu} />

      <Menu id={MENU_ID}>
        <Item onClick={exportSvg}>Export SVG</Item>
      </Menu>
    </>
  );
}

export default Mermaid;
