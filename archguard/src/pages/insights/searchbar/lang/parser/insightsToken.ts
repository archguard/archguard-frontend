import { Comparison } from "./comparison";

export interface Position {
  start: number;
  end: number;
}

export interface BaseToken extends Position {
  type: InsightsToken["type"];
}

/**
 * Represents a field in a search query.
 * i.e., the `dep_name` in `field:dep_name`. field will be {@link Identifier} type
 */
export interface Keyword extends BaseToken {
  type: "keyword";
  value: string;
}

/**
 * Represents a special type of a keyword that used as a logic operator
 * i.e., the `and` and `or` keyword
 */
export interface Operator extends BaseToken {
  type: "operator";
  value: string;
}

/**
 * Represents a field in a search query.
 * i.e., the `dep_name` in `field:dep_name`. field will be {@link Identifier} type
 */
export interface Identifier extends BaseToken {
  type: "identifier";
  value: string;
}

/**
 * separator
 * i.e., the `:` in `field:dep_name`.
 */
export interface Separator extends BaseToken {
  type: "separator";
}

/**
 * `string` kind value, i.e.: 'log' or "log"
 */
export interface StringKind extends BaseToken {
  type: "string";
  value: string;
}

/**
 * `regex` kind value, i.e.: /log/
 */
export interface RegexKind extends BaseToken {
  type: "regex";
  value: string;
}

/**
 * `like` kind value, i.e.: %log%
 */
export interface LikeKind extends BaseToken {
  type: "like";
  value: string;
}

/**
 * comparison like: '==', '!=','>', '<', '>=', '<='
 */
export interface ComparisonKind extends BaseToken {
  type: "comparison";
  value: Comparison;
}

export interface Error extends BaseToken {
  type: "error";
  // for compatibility with monaco editor, we use `value` to store the error message
  value: string;
}

export type InsightsToken =
  | Keyword
  | Operator
  | Identifier
  | Separator
  | StringKind
  | RegexKind
  | LikeKind
  | ComparisonKind
  | Error;
