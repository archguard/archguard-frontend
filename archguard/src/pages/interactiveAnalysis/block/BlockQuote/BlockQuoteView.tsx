import React from "react";
import { NodeView, EditorView } from "prosemirror-view";
import { Node as PMNode } from "prosemirror-model";

import { PortalProviderAPI } from "@/pages/interactiveAnalysis/nodeview/react-portals";
import { EventDispatcher } from "@/pages/interactiveAnalysis/nodeview/utils/event-dispatcher";
import {
  ForwardRef,
  getPosHandler,
  ReactNodeView,
} from "@/pages/interactiveAnalysis/nodeview/ReactNodeView";
import {
  BlockQuote,
  BlockQuoteOptions,
} from "@/pages/interactiveAnalysis/block/BlockQuote/BlockQuote";

export interface IProps {
  options?: BlockQuoteOptions;
}

export class BlockQuoteView extends ReactNodeView<IProps> {
  getContentDOM() {
    const dom = document.createElement("div");
    dom.classList.add(`${this.node.type.name}-dom-wrapper`);
    return {
      dom,
    };
  }

  render(_props: {}, forwardRef: ForwardRef) {
    return <BlockQuote ref={forwardRef} />;
  }
}

export function blockQuoteNodeView(
  portalProviderAPI: PortalProviderAPI,
  eventDispatcher: EventDispatcher,
  options?: BlockQuoteOptions,
) {
  return (node: PMNode, view: EditorView, getPos: getPosHandler): NodeView =>
    new BlockQuoteView(node, view, getPos, portalProviderAPI, eventDispatcher, {
      options,
    }).init();
}
