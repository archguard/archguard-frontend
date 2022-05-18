import * as React from "react";
import { textblockTypeInputRule } from "prosemirror-inputrules";
import { NodeSelection, Selection } from "prosemirror-state";
import Node from "rich-markdown-editor/dist/nodes/Node";
import CellEditor from "@/pages/interactiveAnalysis/coreEditor/cellEditor/CellEditor";

const DEFAULT_LANGUAGE = "kotlin";
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
        subject: {
          default: null
        }
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
              subject: this.subject
            };
          },
        },
      ],
      toDOM: (node) => {
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

  component = (props) => {
    const language = props.node.attrs?.language || DEFAULT_LANGUAGE;
    const value = props.node.textContent || "";

    return (
      <div>
        <CellEditor
          language={language}
          code={value}
          websocket={this.options.websocket}
          removeSelf={this.deleteSelf(props)}
          codeChange={this.handleCodeChange}
          languageChange={this.handleLanguageChange}
        />
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

  handleLanguageChange = (event) => {
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
      getAttrs: (tok) => ({ language: tok.info }),
    };
  }
}
