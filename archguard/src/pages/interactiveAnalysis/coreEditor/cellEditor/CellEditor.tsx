import React, { useCallback, useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { IKeyboardEvent } from "monaco-editor";
import { Button, Tooltip } from "antd";
import { CaretRightOutlined, StopOutlined } from "@ant-design/icons";
import styles from "./CellEditor.less";
import { ReplResult } from "@/types/ascode";
import { ResultDispatcher } from "@/pages/interactiveAnalysis/block/resultDispatcher";
import { addAutoCompletion } from "@/pages/interactiveAnalysis/coreEditor/cellEditor/autoCompletion";
import { InteractiveAnalysisContext } from "@/pages/interactiveAnalysis/InteractiveAnalysisContext";

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

interface BlockEditorProps {
  code: string;
  language: string;
  codeChange: (code: string, editor: Monaco) => any;
  languageChange: (event: any) => any;
  removeSelf: any;
  context: InteractiveAnalysisContext;
}

function CellEditor(props: BlockEditorProps) {
  const editorRef = useRef(null as any);
  const [height, setHeight] = useState("100%");
  const [code, setCode] = useState(props.code);
  const [language, setLanguage] = useState(props.language);
  const [result, setResult] = useState(null as ReplResult);
  const [isRunning, setIsRunning] = useState(false)

  let { id, subject } = props.context.replService.register();

  useEffect(() => {
    if (code != null) {
      props.context.replService.saveCode(code, id);
    }
  }, [code])

  subject.subscribe({
    next: (msg: ReplResult) => {
      setResult(msg as any);
      setIsRunning(false);
    },
    error: () => {},
    complete: () => {},
  });

  const runCode = useCallback(() => {
    props.context.replService.eval(code, id)
    setIsRunning(true);
  }, [setResult, code, isRunning, language]);

  function adjustHeight(editor: monaco.editor.IStandaloneCodeEditor) {
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
    // if had multiple editors will show multiple cursors,
    // it will make user confuse
    // editor.focus();
    editor.onKeyDown((e: IKeyboardEvent) => {
      if (e.code === "Backspace") {
        if (editor.getValue() === "") {
          props.removeSelf();
        }
      }
    });

    addAutoCompletion()
  }

  const handleEditorDidMount = useCallback((editor: Editor) => {
      editorRef.current = editor;
      if (editorRef.current) {
        adjustHeight(editorRef.current);
        initEditor(editor);
      }
    },
    [editorRef, setHeight, code]
  );

  const changeCode = useCallback(code => {
      if (editorRef.current) {
        adjustHeight(editorRef.current);
        setCode(code);

        props.context.replService.saveCode(code, id);
        props.codeChange(code, editorRef.current);
      }
    },
    [editorRef, setCode, id]
  );

  const handleLanguageChange = useCallback((event) => {
      setLanguage(event.target.value);
      props.languageChange(event);
    },
    [setLanguage, props.languageChange]
  );

  const languageOptions = Object.entries(LANGUAGES);
  const createLanguageSelect = (value: string) => {
    return (
      <select className={ styles.languageSelect } defaultValue={value} onChange={handleLanguageChange}>
        {languageOptions.map(([key, label]) => (
          <option key={key} value={key === "none" ? "" : key}>
            {label}
          </option>
        ))}
      </select>
    );
  };

  function renderOutput() {
    if(!result) {return }
    return <div className={styles.output}>{ResultDispatcher(result, props.context)}</div>;
  }

  return (
    <div>
      <div className={ styles.toolbar}>
        { !isRunning && <Tooltip title="Run">
          <Button type="primary" icon={ <CaretRightOutlined /> } onClick={ runCode } disabled={isRunning}/>
        </Tooltip> }
        { isRunning && <Tooltip title="Stop">
          <Button type="primary" icon={ <StopOutlined /> } disabled={true} />
        </Tooltip> }
        { createLanguageSelect(language) }
      </div>
      <Editor
        height={ height }
        language={ language }
        value={ code }
        onChange={ changeCode }
        onMount={ handleEditorDidMount }
        options={ { scrollBeyondLastLine: false, automaticLayout: true } }
      />

      { renderOutput() }
    </div>
  );
}

export default CellEditor;
