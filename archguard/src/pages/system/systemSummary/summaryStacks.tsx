import { CompositionDependency } from "@/api/module/project";

export function summaryStacks(deps: CompositionDependency[]) {
  const result = {};
  const heavyDeps = {};

  for (let dep of deps) {
    if (dep.depScope == "NORMAL" && dep.depArtifact != "" && dep.depArtifact != ".*") {
      result[dep.depArtifact] = true;
      if (dep.depArtifact.includes("-")) {
        let head = dep.depArtifact.split("-")[0];
        heavyDeps[dep.depGroup + "." + head] = head;
      }
    }
  }

  // merge by headers ?
  return {
    all: Object.keys(result),
    heavy: heavyDeps,
  };
}
