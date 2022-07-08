import { INSIGHTS_KEYWORDS, OP_KEYWORDS } from "@/pages/insights/searchbar/lang/keywords";

export const insightsLangToken = {
  defaultToken: "",
  tokenPostfix: ".insights",

  keywords: [...INSIGHTS_KEYWORDS, ...OP_KEYWORDS],
  typeKeywords: [],
  operators: ["=", ">", "<", "!", "~", "?", ":", "==", "<=", ">=", "!="],

  symbols: /[=><!~?&|+\-*\/\^]+/,

  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

  versionString: /[0-9a-zA-Z_-]+/,

  regexpctl: /[(){}[\]$^|\-*+?.]/,
  regexpesc: /\\(?:[bBdDfnrstvwWn0\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

  tokenizer: {
    root: [
      [/[a-zA-Z_$][\w$]*/, { cases: { "@keywords": "keyword.$0", "@default": "identifier" } }],

      { include: "@whitespace" },

      // regular expression: ensure it is terminated before beginning (otherwise it is an operator)
      [
        /\/(?=([^\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/,
        {
          token: "regexp",
          bracket: "@open",
          next: "@regexp",
        },
      ],

      // numbers
      [/(@digits)\.(@digits)\.(@versionString)?/, "number.version"],
      // normal numbers
      [/(@digits)[eE]([-+]?(@digits))?/, "number.float"],
      [/(@digits)\.(@digits)([eE][-+]?(@digits))?/, "number.float"],
      [/0[xX](@hexdigits)/, "number.hex"],
      [/0[oO]?(@octaldigits)/, "number.octal"],
      [/0[bB](@binarydigits)/, "number.binary"],
      [/(@digits)/, "number"],

      [/[:;]/, "delimiter"],

      [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/'([^'\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/%([^%\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/"/, "string", "@string_double"],
      [/'/, "string", "@string_single"],
      [/%/, "string.like", "@string_like"],
    ],

    string_double: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, "string", "@pop"],
    ],

    string_single: [
      [/[^\\']+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/'/, "string", "@pop"],
    ],

    string_like: [
      [/[^\\%]+/, "string.like"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/%/, "string.like", "@pop"],
    ],

    whitespace: [[/[ \t\r\n]+/, "white"]],

    // We match regular expression quite precisely
    regexp: [
      [
        /(\{)(\d+(?:,\d*)?)(\})/,
        ["regexp.escape.control", "regexp.escape.control", "regexp.escape.control"],
      ],
      [
        /(\[)(\^?)(?=(?:[^\]\\/]|\\.)+)/,
        [
          "regexp.escape.control",
          {
            token: "regexp.escape.control",
            next: "@regexrange",
          },
        ],
      ],
      [/(\()(\?:|\?=|\?!)/, ["regexp.escape.control", "regexp.escape.control"]],
      [/[()]/, "regexp.escape.control"],
      [/@regexpctl/, "regexp.escape.control"],
      [/[^\\\/]/, "regexp"],
      [/@regexpesc/, "regexp.escape"],
      [/\\\./, "regexp.invalid"],
      [/(\/)([gimsuy]*)/, [{ token: "regexp", bracket: "@close", next: "@pop" }, "keyword.other"]],
    ],

    regexrange: [
      [/-/, "regexp.escape.control"],
      [/\^/, "regexp.invalid"],
      [/@regexpesc/, "regexp.escape"],
      [/[^\]]/, "regexp"],
      [/]/, { token: "regexp.escape.control", next: "@pop", bracket: "@close" }],
    ],
  },
};
