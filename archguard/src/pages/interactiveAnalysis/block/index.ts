import { Node } from 'prosemirror-model'
import { EditorView, Decoration } from 'prosemirror-view'

import { BlockQuoteView } from './blockquote/BlockQuoteView'

export const nodeViews = {
  blockquote: (
    node: Node,
    view: EditorView,
    getPos: (() => number) | boolean,
    decorations: Decoration[]
  ) => new BlockQuoteView(node, view, getPos, decorations),
}
