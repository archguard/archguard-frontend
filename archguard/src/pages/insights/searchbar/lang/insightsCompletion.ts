import { Monaco } from "@monaco-editor/react";
import { languages, Range } from "monaco-editor";
import { getEditorSuggestType } from "@/pages/insights/searchbar/lang/suggestType";
import { getTokenValue, InsightToken, lexer } from "@/pages/insights/searchbar/lang/lexer";
import {
  INSIGHTS_KEYWORDS,
  ISSUE_KEYWORDS,
  OP_KEYWORDS,
  SCA_KEYWORDS,
} from "@/pages/insights/searchbar/lang/keywords";

function byArray(
  monaco: Monaco,
  range: { endColumn: number; startColumn: number; endLineNumber: number; startLineNumber: number },
  items: string[],
): languages.CompletionItem[] {
  return items.map((value) => ({
    label: value,
    kind: monaco.languages.CompletionItemKind.Value,
    insertText: value,
    filterText: value,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: range,
  }));
}

function createSuggestion(
  range: Range,
  inputType: string,
  monaco: Monaco,
): languages.CompletionItem[] {
  let completions: any[];

  let types: string[] = [];
  switch (inputType) {
    case "sca":
      types = SCA_KEYWORDS;
      break;
    case "issue":
      types = ISSUE_KEYWORDS;
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
const valueSymbols = ["''", '""', "%%", "//"];

function suggestionsByLiteral(
  monaco: Monaco,
  range: Range,
  tokens: InsightToken[],
  keywords: string[],
): languages.CompletionItem[] {
  let suggestions: languages.CompletionItem[] = [];
  let latestType = tokens[tokens.length - 1]["type"];

  switch (latestType) {
    case "identifier":
      suggestions = [...byArray(monaco, range, comparisonSymbols)];
      break;
    case "comparison":
      suggestions = [...byArray(monaco, range, valueSymbols)];
      break;
    case "string":
    case "like":
    case "regex":
      suggestions = [...byArray(monaco, range, keywords)];
      break;
    case "keyword":
      suggestions = byArray(monaco, range, keywords);
      break;
    case "separator":
      suggestions = createSuggestion(range, getEditorSuggestType() || "sca", monaco);
      break;
    default:
      suggestions = createSuggestion(range, getEditorSuggestType() || "sca", monaco);
  }

  let alreadyUseIdentifier = tokens
    .filter((token) => token["type"] === "identifier")
    .map((token) => getTokenValue(token));

  const newSuggestions = suggestions.filter((element) => {
    return !alreadyUseIdentifier.includes(element.label);
  });

  return newSuggestions;
}

export function insightsCompletion(monaco: Monaco): languages.CompletionItemProvider {
  return {
    triggerCharacters: [...printable],
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
      } as Range;

      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const tokens = lexer(textUntilPosition);

      if (tokens.length > 0) {
        return { suggestions: suggestionsByLiteral(monaco, range, tokens, INSIGHTS_KEYWORDS) };
      } else {
        return { suggestions: byArray(monaco, range, INSIGHTS_KEYWORDS) };
      }
    },
  };
}
