import { Node } from 'prosemirror-model'
import { EditorView, Decoration } from 'prosemirror-view'

import { BlockQuoteView } from './BlockQuote/BlockQuoteView'
import { CellEditorView } from './CellEditor/CellEditorView'
import { EventDispatcher } from "@/pages/interactiveAnalysis/nodeview/utils/event-dispatcher";
import { PortalProviderAPI } from "@/pages/interactiveAnalysis/nodeview/react-portals";


export function createNodeViews(eventDispatcher: EventDispatcher, portalProviderAPI: PortalProviderAPI) {
  return {
    blockquote: (
      node: Node,
      view: EditorView,
      getPos: (() => number) | boolean,
      decorations: Decoration[],
    ) => new BlockQuoteView(node, view, getPos, portalProviderAPI, eventDispatcher, {

    }).init(),

    codeBlock: (
      node: Node,
      view: EditorView,
      getPos: (() => number) | boolean,
      decorations: Decoration[],
    ) => new CellEditorView(node, view, getPos, decorations),
  };
}
