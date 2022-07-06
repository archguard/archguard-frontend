import { Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";
import { getSuggestType } from "@/pages/insights/searchbar/lang/suggestType";
import { InsightToken, literal } from "@/pages/insights/searchbar/lang/literal";

function byArray(
  monaco: Monaco,
  range: { endColumn: number; startColumn: number; endLineNumber: number; startLineNumber: number },
  items: string[],
) {
  return items.map((value) => ({
    label: value,
    kind: monaco.languages.CompletionItemKind.Value,
    insertText: value,
    filterText: value,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range,
  }));
}

function createSuggestion(range, inputType: string, monaco: Monaco): languages.CompletionItem[] {
  let completions: any[];

  let types = [];
  switch (inputType) {
    case "sca":
      types = ["dep_name", "dep_version"];
      break;
    case "issue":
      types = ["name"];
      break;
  }

  completions = [...types].map((value) => ({
    label: value,
    kind: monaco.languages.CompletionItemKind.Value,
    insertText: value,
    filterText: value,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range,
  }));

  return completions;
}

const printable =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
const comparisonSymbols = ["==", "!=", ">", "<", ">=", "<="];
const insightKeywords = ["field"];
const valueSymbols = ["''", '""', "%%", "//"];

function suggestionsByLiteral(
  monaco: Monaco,
  range: { endColumn: number; startColumn: number; endLineNumber: any; startLineNumber: any },
  tokens: InsightToken[],
  keywords: string[],
) {
  let suggestions = [];
  let latestType = tokens[tokens.length - 1]["type"];

  switch (latestType) {
    case "space":
      // eslint-disable-next-line no-case-declarations
      let hasSuggest = false;

      if (tokens.length > 2) {
        let secondToLast = tokens[tokens.length - 2]["type"];
        switch (secondToLast) {
          case "comparison":
            hasSuggest = true;
            suggestions = [...byArray(monaco, range, valueSymbols)];
            break;
          case "string":
          case "like":
          case "regex":
            hasSuggest = true;
            suggestions = [...byArray(monaco, range, keywords)];
            break;
        }
      }

      if (!hasSuggest) {
        suggestions = [
          ...byArray(monaco, range, keywords),
          ...byArray(monaco, range, comparisonSymbols),
        ];
      }

      break;
    case "literal":
      suggestions = byArray(monaco, range, keywords);
      break;
    case "separator":
      suggestions = createSuggestion(range, getSuggestType() || "sca", monaco);
      break;
    case "like":
    case "regex":
    case "string":
      break;
    default:
      suggestions = createSuggestion(range, getSuggestType() || "sca", monaco);
  }

  return suggestions;
}

export function insightsCompletion(monaco: Monaco) {
  return {
    triggerCharacters: printable,
    provideCompletionItems: function (model, position) {
      model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const word = model.getWordUntilPosition(position);

      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const tokens = literal(textUntilPosition);

      if (tokens.length > 0) {
        return { suggestions: suggestionsByLiteral(monaco, range, tokens, insightKeywords) };
      } else {
        return { suggestions: byArray(monaco, range, insightKeywords) };
      }
    },
  };
}
