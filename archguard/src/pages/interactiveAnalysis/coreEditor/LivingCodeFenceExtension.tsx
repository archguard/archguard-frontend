import * as React from "react";
import { textblockTypeInputRule } from "prosemirror-inputrules";
import { NodeSelection, Selection } from "prosemirror-state";
import Node from "rich-markdown-editor/dist/nodes/Node";
import { useCallback, useState } from "react";
import { webSocket } from "rxjs/webSocket";
import mermaidWrapper from "@/pages/interactiveAnalysis/block/graph/mermaidWrapper";
import CellEditor from "@/pages/interactiveAnalysis/coreEditor/CellEditor";

const DEFAULT_LANGUAGE = "kotlin";


interface ReactiveAction {
  actionType: string;
  className: string;
  graphType: string;
  data: string;
}

interface ReplResult {
  resultValue: string;
  isArchdocApi: boolean;
  className: string;
  actionData: string;
  action: ReactiveAction;
}

export class LivingCodeFenceExtension extends Node {
  get name() {
    return "code_fence";
  }

  get schema() {
    return {
      attrs: {
        language: {
          default: DEFAULT_LANGUAGE,
        },
        code: {
          default: "",
        },
      },
      content: "text*",
      marks: "",
      group: "block",
      code: true,
      defining: true,
      selectable: true,
      draggable: false,
      parseDOM: [
        { tag: "pre", preserveWhitespace: "full" },
        {
          tag: ".archguard-code",
          preserveWhitespace: "full",
          contentElement: "code",
          getAttrs: (dom: HTMLDivElement) => {
            return {
              code: "",
              language: dom.dataset.language,
            };
          },
        },
      ],
      toDOM: node => {
        return [
          "div",
          { class: "simple-code", "data-language": node.attrs.language },
          ["pre", ["code", { spellCheck: false }, 0]],
        ];
      },
    };
  }

  get plugins() {
    return [];
  }

  component = props => {
    const language = props.node.attrs?.language || DEFAULT_LANGUAGE;
    const value = props.node.textContent || "";

    let result = null;
    const subject = webSocket("ws://localhost:8848/");

    const runCode = (code) => {
      subject.subscribe({
        next: (msg) => {
          result = msg as ReplResult;
        },
        error: (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        complete: () => console.log("complete"), // Called when connection is closed (for whatever reason).
      });

      subject.next({ code: code });
    };

    function renderGraph(dataStr: string) {
      let data = JSON.parse(dataStr);

      let def = "";
      for (let datum of data) {
        def += datum.source + "-->" + datum.target + ";\n";
      }

      return (
        <>
          {mermaidWrapper.mermaid({
            node: {
              key: "mermaid",
              definition: `graph TD;
   ${def}`,
            },
          })}
        </>
      );
    }

    return (
      <div onClick={this.handleSelect(props)}>
        <CellEditor
          language={language}
          code={value}
          evalCode={runCode}
          removeSelf={this.deleteSelf(props)}
          codeChange={this.handleCodeChange}
          languageChange={this.handleLanguageChange}
        />

        {result && result.isArchdocApi && result.action.graphType == "archdoc" && (
          <div>{renderGraph(result.action.data)}</div>
        )}
      </div>
    );
  };

  inputRules({ type }) {
    return [textblockTypeInputRule(/^```$/, type)];
  }

  toMarkdown(state, node) {
    state.write("```" + (node.attrs.language || "") + "\n");
    state.text(node.attrs.code || node.textContent, false);
    state.ensureNewLine();
    state.write("```");
    state.closeBlock(node);
  }

  get markdownToken() {
    return "fence";
  }

  handleLanguageChange = event => {
    const { view } = this.editor;
    const { tr } = view.state;
    const element = event.target;
    const { top, left } = element.getBoundingClientRect();
    const result = view.posAtCoords({ top, left });

    if (result) {
      const language = element.value;

      const transaction = tr
        .setSelection(Selection.near(view.state.doc.resolve(result.inside)))
        .setNodeMarkup(result.inside, undefined, {
          language,
        });
      view.dispatch(transaction);
    }
  };

  handleCodeChange = (code: string, editor: any) => {
    const { view } = this.editor;
    const { tr } = view.state;
    const element = editor.getDomNode();
    const { top, left } = element.getBoundingClientRect();
    const result = view.posAtCoords({ top, left });

    if (result) {
      const transaction = tr
        .setSelection(Selection.near(view.state.doc.resolve(result.inside)))
        .setNodeMarkup(result.inside, undefined, {
          code,
        });
      view.dispatch(transaction);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  deleteSelf = ({ getPos }) => () => {
    const { view } = this.editor;
    const $pos = view.state.doc.resolve(getPos());
    const tr = view.state.tr.setSelection(new NodeSelection($pos));
    view.dispatch(tr.deleteSelection());
    view.focus();
  };

  parseMarkdown() {
    return {
      block: "code_block",
      getAttrs: tok => ({ language: tok.info }),
    };
  }

  handleSelect = ({ getPos }) => event => {
    event.preventDefault();

    const { view } = this.editor;
    const $pos = view.state.doc.resolve(getPos());
    const transaction = view.state.tr.setSelection(new NodeSelection($pos));
    view.dispatch(transaction);
  };
}
