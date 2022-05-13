import React from "react";

const Mermaid = React.lazy(() => import("./Mermaid"));

// Create a serializer for the mermaid type that only renders client side
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
