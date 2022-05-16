import * as React from 'react'
import ReactDOM from 'react-dom'
import { Node } from 'prosemirror-model'
import { EditorView, NodeView, Decoration } from 'prosemirror-view'

import { CellCodeEditor } from "@/pages/interactiveAnalysis/block/CellEditor/CellCodeEditor";

export class CellEditorView implements NodeView {
  dom: HTMLElement
  contentDOM: HTMLElement
  ref: React.RefObject<any>

  // All the available parameters that are passed to the NodeView
  node: Node
  view: EditorView
  getPos: (() => number) | boolean
  decorations: Decoration[]
  attrs: { [key: string]: string | number}

  constructor(node: Node, view: EditorView, getPos: (() => number) | boolean, decorations: Decoration[]) {
    this.attrs = node.attrs
    this.node = node
    this.view = view
    this.getPos = getPos
    this.decorations = decorations

    this.ref = React.createRef()

    this.dom = document.createElement('div')
    this.contentDOM = document.createElement('div')

    this.dom.classList.add('node__dom')
    this.contentDOM.classList.add('node__content-dom')

    ReactDOM.render(<CellCodeEditor ref={this.ref}/>, this.dom, null)
  }

  // eslint-disable-next-line no-unused-vars
  // update(node: Node) {
  //   return true
  // }

  // destroy() {
  //   ReactDOM.unmountComponentAtNode(this.dom)
  // }
}
