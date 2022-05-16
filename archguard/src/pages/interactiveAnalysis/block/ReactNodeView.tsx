import { EditorView, NodeView } from "prosemirror-view";
import { Node as PMNode } from 'prosemirror-model';

export type ReactComponentProps = { [key: string]: unknown };
// eslint-disable-next-line no-unused-vars
export default class ReactNodeView<P = ReactComponentProps> implements NodeView {
  private domRef?: HTMLElement;

  view: EditorView;
  contentDOM: Node | undefined;
  node: PMNode;

  constructor(
    node: PMNode,
    view: EditorView) {
    this.node = node;
    this.view = view;
  }

  init() {
    this.domRef = this.createDomRef();
  }

  createDomRef(): HTMLElement {
    if (!this.node.isInline) {
      return document.createElement('div');
    }

    return document.createElement('span');
  }
}
