import * as React from 'react'

import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { schema } from './schema'
import { createPlugins } from './createPlugins'

import './Editor.less'
import { createDispatch, Dispatch, EventDispatcher } from "@/pages/interactiveAnalysis/nodeview/utils/event-dispatcher";
import { PortalProviderAPI } from "@/pages/interactiveAnalysis/nodeview/react-portals";
import { createNodeViews } from "@/pages/interactiveAnalysis/block";

export class Editor extends React.Component<{}, {}> {
  editorRef: React.RefObject<HTMLDivElement>

  editorState: EditorState
  editorView?: EditorView

  eventDispatcher: EventDispatcher
  portalProviderAPI: PortalProviderAPI;

  dispatch: Dispatch

  constructor(props: {}) {
    super(props)
    this.editorRef = React.createRef()

    this.eventDispatcher = new EventDispatcher()
    this.portalProviderAPI = new PortalProviderAPI();
    this.dispatch = createDispatch(this.eventDispatcher)

    this.editorState = EditorState.create({
      schema,
      plugins: createPlugins(
        this.eventDispatcher,
        this.portalProviderAPI
      ),
    })
  }

  createEditorView = (element: HTMLDivElement | null) => {
    if (element != null) {
      this.editorView = new EditorView(element, {
        nodeViews: createNodeViews(this.eventDispatcher, this.portalProviderAPI),
        state: this.editorState,
      })
    }
  }

  componentDidMount() {
    this.createEditorView(this.editorRef.current)
    this.forceUpdate()
  }

  componentWillUnmount() {
    if (this.editorView) {
      this.editorView.destroy()
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return <div id="minimal-editor" ref={this.editorRef} />
  }
}
