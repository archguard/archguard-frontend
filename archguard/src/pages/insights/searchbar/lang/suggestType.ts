// todo: change to localstorage
export function setEditorSuggestType(text) {
  window["editorType"] = text;
}

export function getEditorSuggestType() {
  return window["editorType"];
}
