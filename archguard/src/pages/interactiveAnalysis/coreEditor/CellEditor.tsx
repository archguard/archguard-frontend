import React, { useCallback, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { IKeyboardEvent } from "monaco-editor";
// import { LANGUAGES } from "rich-markdown-editor/dist/plugins/Prism";

interface BlockEditorProps {
  code: string;
  language: string;
  evalCode: any;
  codeChange: any;
  languageChange: any;
  removeSelf: any;
}

export const LANGUAGES = {
  none: "None", // additional entry to disable highlighting
  bash: "Bash",
  css: "CSS",
  clike: "C",
  csharp: "C#",
  go: "Go",
  markup: "HTML",
  objectivec: "Objective-C",
  java: "Java",
  javascript: "JavaScript",
  kotlin: "Kotlin",
  json: "JSON",
  perl: "Perl",
  php: "PHP",
  powershell: "Powershell",
  python: "Python",
  ruby: "Ruby",
  rust: "Rust",
  sql: "SQL",
  typescript: "TypeScript",
  yaml: "YAML",
};

function CellEditor(props: BlockEditorProps) {
  const editorRef = useRef(null);
  const [height, setHeight] = useState("100%");
  const [code, setCode] = useState(props.code);
  const [language, setLanguage] = useState(props.language);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function adjustHeight(editor: monaco.editor.IStandaloneCodeEditor) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
    const lineCount = editor.getModel()?.getLineCount() || 1;
    const editorHeight = editor.getTopForLineNumber(lineCount + 1) + lineHeight;

    setHeight(editorHeight + "px");
    editor.layout({
      width: editor.getLayoutInfo().width,
      height: editorHeight,
    });
  }

  function initEditor(editor) {
    editor.focus();
    editor.onKeyDown((e: IKeyboardEvent) => {
      if (e.code === "Backspace") {
        if (editor.getValue() === "") {
          props.removeSelf();
        }
      }
    });
  }

  const handleEditorDidMount = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (editor: Editor) => {
      editorRef.current = editor;
      if (!!editorRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        adjustHeight(editorRef.current);
        initEditor(editor);
      }
    },
    [editorRef, setHeight, code]
  );

  const changeCode = useCallback(
    code => {
      if (!!editorRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        adjustHeight(editorRef.current);
        setCode(code);
        props.codeChange(code, editorRef.current);
      }
    },
    [editorRef, setCode]
  );

  useCallback(() => {
    props.evalCode(code);
  }, [code]);

  const handleLanguageChange = useCallback(
    event => {
      setLanguage(event.target.value);
      props.languageChange(event);
    },
    [setLanguage, props.languageChange]
  );

  const languageOptions = Object.entries(LANGUAGES);

  const createLanguageSelect = (value: string) => {
    return (
      <select defaultValue={value} onChange={handleLanguageChange}>
        {languageOptions.map(([key, label]) => (
          <option key={key} value={key === "none" ? "" : key}>
            {label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div>
      {createLanguageSelect(language)}
      <Editor
        height={height}
        language={language}
        value={code}
        onChange={changeCode}
        onMount={handleEditorDidMount}
        options={{ scrollBeyondLastLine: false, automaticLayout: true }}
      />
    </div>
  );
}

export default CellEditor;
