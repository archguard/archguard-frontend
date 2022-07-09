import { Monaco } from "@monaco-editor/react";
import { languages, Range } from "monaco-editor";
import { getEditorSuggestType } from "@/pages/insights/searchbar/lang/suggestType";
import { getTokenValue, lexer } from "@/pages/insights/searchbar/lang/parser/lexer";
import {
  INSIGHTS_KEYWORDS,
  ISSUE_KEYWORDS,
  SCA_KEYWORDS,
} from "@/pages/insights/searchbar/lang/parser/keywords";
import { InsightsToken } from "@/pages/insights/searchbar/lang/parser/insightsToken";

function suggestionsByValues(
  items: string[],
  monaco: Monaco,
  range: Range,
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

function suggestionsByType(
  inputType: string,
  range: Range,
  monaco: Monaco,
): languages.CompletionItem[] {
  let types: string[] = [];
  switch (inputType) {
    case "sca":
      types = SCA_KEYWORDS;
      break;
    case "issue":
      types = ISSUE_KEYWORDS;
      break;
  }

  return suggestionsByValues(types, monaco, range);
}

const printable =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
const comparisonSymbols = ["==", "!=", ">", "<", ">=", "<="];
const valueSymbols = ["''", '""', "%%", "//"];

function suggestionsByLiteral(
  monaco: Monaco,
  range: Range,
  tokens: InsightsToken[],
  keywords: string[],
): languages.CompletionItem[] {
  let suggestions: languages.CompletionItem[] = [];
  let latestType = tokens[tokens.length - 1]["type"];

  switch (latestType) {
    case "identifier":
      suggestions = [...suggestionsByValues(comparisonSymbols, monaco, range)];
      break;
    case "comparison":
      suggestions = [...suggestionsByValues(valueSymbols, monaco, range)];
      break;
    case "string":
    case "like":
    case "regex":
      suggestions = [...suggestionsByValues(keywords, monaco, range)];
      break;
    case "operator":
      suggestions = suggestionsByValues(keywords, monaco, range);
      break;
    case "keyword":
      suggestions = suggestionsByValues(keywords, monaco, range);
      break;
    case "separator":
      suggestions = suggestionsByType(getEditorSuggestType() || "sca", range, monaco);
      break;
    default:
      suggestions = suggestionsByType(getEditorSuggestType() || "sca", range, monaco);
  }

  let alreadyUseIdentifier = tokens
    .filter((token) => token["type"] === "identifier")
    .map((token) => getTokenValue(token));

  const withoutUsedIdentifySuggestions = suggestions.filter((element) => {
    return !alreadyUseIdentifier.includes(element.label);
  });

  return withoutUsedIdentifySuggestions;
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
      }

      return { suggestions: suggestionsByValues(INSIGHTS_KEYWORDS, monaco, range) };
    },
  };
}
