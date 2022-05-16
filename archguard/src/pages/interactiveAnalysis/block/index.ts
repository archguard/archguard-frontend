import { Node } from 'prosemirror-model'
import { EditorView, Decoration } from 'prosemirror-view'

import { BlockQuoteView } from './BlockQuote/BlockQuoteView'
import { CellEditorView } from './CellEditor/CellEditorView'

export const nodeViews = {
  blockquote: (
    node: Node,
    view: EditorView,
    getPos: (() => number) | boolean,
    decorations: Decoration[],
  ) => new BlockQuoteView(node, view, getPos, decorations),

  codeBlock: (
    node: Node,
    view: EditorView,
    getPos: (() => number) | boolean,
    decorations: Decoration[],
  ) => new CellEditorView(node, view, getPos, decorations),
};
