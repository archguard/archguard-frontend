import { EditorState, Plugin, PluginKey, Transaction } from "prosemirror-state";

import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

import { createNewBlockQuote, createNewCodeBlock, createNewPmBlockQuote } from "./actions";
import { EventDispatcher } from "@/pages/interactiveAnalysis/nodeview/utils/event-dispatcher";
import { PortalProviderAPI } from "@/pages/interactiveAnalysis/nodeview/react-portals";
import { blockQuoteNodeView } from "@/pages/interactiveAnalysis/block/BlockQuote/BlockQuoteView";

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
        value: any,
        oldState: EditorState<any>,
        newState: EditorState<any>,
      ): any {
        return "";
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
