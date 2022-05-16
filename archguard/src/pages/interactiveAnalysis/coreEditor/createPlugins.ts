import { EditorState, Plugin, PluginKey, Transaction, Selection } from "prosemirror-state";

import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

import { createNewBlockQuote, createNewCodeBlock, createNewPmBlockQuote } from "./actions";
import { EventDispatcher } from "@/pages/interactiveAnalysis/nodeview/utils/event-dispatcher";
import { PortalProviderAPI } from "@/pages/interactiveAnalysis/nodeview/react-portals";
import { blockQuoteNodeView } from "@/pages/interactiveAnalysis/block/BlockQuote/BlockQuoteView";
import { findParentNodeOfType, findSelectedNodeOfType } from "prosemirror-utils";

export const createPlugins = (
  eventDispatcher: EventDispatcher,
  portalProviderAPI: PortalProviderAPI,
) => {
  const plugins: Plugin[] = [];

  plugins.push(history());
  plugins.push(keymap(baseKeymap));
  plugins.push(
    keymap({
      "Ctrl-Alt-b": createNewBlockQuote,
      "Ctrl-Alt-p": createNewPmBlockQuote,
    }),
  );

  plugins.push(
    keymap({
      "Ctrl-Alt-c": createNewCodeBlock,
    }),
  );

  plugins.push(blockQuoteBlockPlugin(eventDispatcher, portalProviderAPI));

  return plugins;
};

export function findBlockQuote(
  state: EditorState,
  selection?: Selection<any> | null,
) {
  const { blockquote } = state.schema.nodes
  return (
    findSelectedNodeOfType(blockquote)(selection || state.selection) ||
    findParentNodeOfType(blockquote)(selection || state.selection)
  )
}

export interface BlockQuoteState {
  blockQuoteActive: boolean
}

function blockQuoteBlockPlugin(
  eventDispatcher: EventDispatcher,
  portalProviderAPI: PortalProviderAPI,
): Plugin {
  return new Plugin({
    state: {
      init(_, state): BlockQuoteState {
        return {
          blockQuoteActive: false,
        };
      },
      apply(
        tr: Transaction<any>,
        pluginState: BlockQuoteState,
        oldState: EditorState<any>,
        newState: EditorState<any>,
      ): any {
        if (tr.docChanged || tr.selectionSet) {
          const blockQuoteActive = !!findBlockQuote(newState, newState.selection)
          if (blockQuoteActive !== pluginState.blockQuoteActive) {
            const nextPluginState = {
              ...pluginState,
              blockQuoteActive,
              // blockQuoteDisabled,
            }
            eventDispatcher.emit("blockQuotePlugin", nextPluginState)
            return nextPluginState
          }
        }

        return pluginState
      },
    },
    key: new PluginKey("blockQuotePlugin"),
    props: {
      nodeViews: {
        blockquote: blockQuoteNodeView(portalProviderAPI, eventDispatcher),
      },
    },
  });
}
