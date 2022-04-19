import cytoscape from 'cytoscape';

const DefaultIcon = require("@/assets/svg/services/default.svg");
const JavaIcon = require("@/assets/svg/services/java.svg");
const NodejsIcon = require("@/assets/svg/services/nodejs.svg");
const PythonIcon = require("@/assets/svg/services/python.svg");
const GoIcon = require("@/assets/svg/services/go.svg");
const KotlinIcon = require("@/assets/svg/services/kotlin.svg");
const CSharpIcon = require("@/assets/svg/services/csharp.svg");
const TypeScriptIcon = require("@/assets/svg/services/typescript.svg");

export function iconForNode(node: cytoscape.NodeSingular) {
  const language = node.data('language').toLowerCase();
  switch (language) {
    case "java":
      return JavaIcon
    case "python":
      return PythonIcon
    case "jvm":
      return JavaIcon
    case "javascript":
      return NodejsIcon
    case "typescript":
      return TypeScriptIcon
    case "go":
      return GoIcon
    case "kotlin":
      return KotlinIcon
    case "c#":
      return CSharpIcon
    case "csharp":
      return CSharpIcon
  }

  return DefaultIcon
}
