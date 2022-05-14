import React, { useEffect, useState } from "react";
import mermaid from 'mermaid'

interface MermaidProps {
  definition: string,
  key: string
}

function Mermaid (props: MermaidProps) {
  console.log(props)
  const id = `mermaid-${props._key}`
  const ref = React.useRef()
  const theme = useState('default')
  // const [mode] = useColorMode()
  // const theme = mode === 'dark' ? 'dark' : 'default'

  useEffect(() => {
    mermaid.initialize({
      startOnLoad:false,
      theme,
    })
  }, [theme])

  useEffect(() => {
    if (ref.current) {
      mermaid.mermaidAPI.render(id, props.definition, (result) => {
        ref.current.innerHTML = result
      })
    }
  }, [theme, props.definition])

  return (
    <>
      <div key="faux" id={id} />
      <div key='preview' ref={ref} />
    </>
  )
}

export default Mermaid;
