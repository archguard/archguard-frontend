import { CompositionDependency } from "@/api/module/project";
import { uniqBy } from "lodash";

const npmImportants = {
  react: "https://archguard.github.io/logo/stacks/react.png",
  antd: "https://archguard.github.io/logo/stacks/ant-design.png",
  d3: "https://archguard.github.io/logo/stacks/d3.jpg",
  cytoscape: "https://archguard.github.io/logo/stacks/cytoscape.png",
  mermaid: "https://archguard.github.io/logo/stacks/mermaid.png",
  prosemirror: "https://archguard.github.io/logo/stacks/prosemirror.png",
  "styled-components": "https://archguard.github.io/logo/stacks/styled-components.png",
  bizcharts: "https://archguard.github.io/logo/stacks/bizcharts.jpg",
  jest: "https://archguard.github.io/logo/stacks/jest.png",
  umi: "https://archguard.github.io/logo/stacks/umi.png",
  typescript: "https://archguard.github.io/logo/stacks/typescript.png",
  lodash: "https://archguard.github.io/logo/stacks/lodash.png",
  eslint: "https://archguard.github.io/logo/stacks/eslint.jpg",
  unified: "https://archguard.github.io/logo/stacks/unified.png",
};

export function stackNpm(deps: CompositionDependency[]) {
  const result = {};
  const importantDeps = {};
  const icons = [];
  const importants = Object.keys(npmImportants);

  for (let dep of deps) {
    result[dep.depArtifact] = true;

    if (importants.includes(dep.depArtifact)) {
      icons.push({
        name: dep.depArtifact,
        img: npmImportants[dep.depArtifact],
      });
    }
  }

  let uniqIcons = uniqBy(icons, (e) => e.name);

  return {
    all: Object.keys(result),
    important: importantDeps,
    icons: uniqIcons,
  };
}
