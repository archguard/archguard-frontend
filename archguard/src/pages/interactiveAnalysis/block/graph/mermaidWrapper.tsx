import React from "react";

const Mermaid = React.lazy(() => import("./Mermaid"));

function mermaid({ node }) {
  const isSSR = typeof window === "undefined";
  return isSSR ? null : (
    <React.Suspense fallback={<div />}>
      <Mermaid on {...node} />
    </React.Suspense>
  );
}

const mermaidWrapper = {
  mermaid,
};

export default mermaidWrapper;
