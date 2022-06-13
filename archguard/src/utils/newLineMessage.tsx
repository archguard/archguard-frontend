import React from "react";

export function newLineMessage(formatMessage, id: string) {
  return formatMessage({ id: id })
    .split(/\\n/)
    .reduce((result: any, word) => {
      return result.length ? [...result, <br />, word] : [word];
    }, []);
}
