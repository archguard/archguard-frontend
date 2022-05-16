import { Schema } from 'prosemirror-model'

export const schema = new Schema({
  nodes: {
    doc: {
      content: 'block+'
    },
    paragraph: {
      content: 'inline*',
      group: 'block',
      selectable: false,
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        return ['p', 0]
      },
    },
    pmBlockquote: {
      content: 'paragraph+',
      group: 'block',
      defining: true,
      selectable: false,
      attrs: {
        class: { default: 'pm-BlockQuote' },
      },
      parseDOM: [{ tag: 'blockquote' }],
      toDOM(node) {
        return ['blockquote', node.attrs, 0];
      },
    },
    codeBlock: {
      content: 'text*',
      group: 'block',
      code: true,
      defining: true,
      selectable: false,
      attrs: {
        class: { default: 'archguard-code-block' },
      },
      parseDOM: [
        { tag: "pre", preserveWhitespace: "full" },
        {
          tag: ".code-block",
          preserveWhitespace: "full",
          contentElement: "code",
          getAttrs: (dom: HTMLDivElement) => {
            return {
              language: dom.dataset.language,
            };
          },
        },
      ],
      toDOM(node) {
        return [
          "div",
          { class: "code-block", "data-language": node.attrs.language },
          ["pre", ["code", { spellCheck: false }, 0]],
        ];
      },
    },
    blockquote: {
      content: 'paragraph+',
      group: 'block',
      defining: true,
      selectable: false,
      parseDOM: [{ tag: 'blockquote' }],
      toDOM() {
        return ['blockquote', 0];
      },
    },
    text: {
      group: 'inline'
    },
  }
})
