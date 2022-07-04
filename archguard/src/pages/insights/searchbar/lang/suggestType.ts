export function setWindowEditorType(text) {
  window["editorType"] = text;
}

export function getSuggestType() {
  return window["editorType"];
}
