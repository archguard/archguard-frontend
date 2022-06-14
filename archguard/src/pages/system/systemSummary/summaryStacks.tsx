import { CompositionDependency } from "@/api/module/project";
import { uniqBy } from "lodash";
import { SystemInfo } from "@/api/addition/systemInfo";

// todo: save images for online
const javaDepsImageMap = {
  spring: "https://archguard.github.io/logo/stacks/spring-boot.png",
  jdbi: "https://archguard.github.io/logo/stacks/jdbi.png",
  kotlin: "https://archguard.github.io/logo/stacks/kotlin.png",
  grpc: "https://archguard.github.io/logo/stacks/grpc.png",
};

const jvmImportants = {
  "org.flywaydb": "https://archguard.github.io/logo/stacks/flyway.jpg",
  "org.apache.dubbo": "https://archguard.github.io/logo/stacks/dubbo.jpg",
  "org.jdbi": "https://archguard.github.io/logo/stacks/jdbi.png",
};

const npmImportants = {
  "react": "https://archguard.github.io/logo/stacks/react.png",
  "antd": "https://archguard.github.io/logo/stacks/ant-design.png",
  "d3": "https://archguard.github.io/logo/stacks/d3.jpg",
};

export interface StackIcon {
  name: string;
  img: string;
}

export interface StackSummary {
  all: string[];
  important: any;
  icons: StackIcon[];
}

function sumJvm(deps: CompositionDependency[]) {
  const result = {};
  const importantDeps = {};
  const icons = [];
  const importants = Object.keys(jvmImportants);

  for (let dep of deps) {
    if (!(dep.depScope == "NORMAL" && dep.depArtifact != "" && dep.depArtifact != ".*")) {
      continue;
    }

    result[dep.depArtifact] = true;
    if (dep.depArtifact.includes("-")) {
      let head = dep.depArtifact.split("-")[0];
      importantDeps[dep.depGroup + "." + head] = head;

      if (javaDepsImageMap[head]) {
        icons.push({
          name: head,
          img: javaDepsImageMap[head],
        });
      }
    }

    if (importants.includes(dep.depGroup)) {
      icons.push({
        name: dep.depGroup,
        img: jvmImportants[dep.depGroup],
      });
    }
  }

  console.info("heavy: " + JSON.stringify(importantDeps));
  let uniqIcons = uniqBy(icons, (e) => e.name);

  return {
    all: Object.keys(result),
    important: importantDeps,
    icons: uniqIcons,
  };
}

function sumNpm(deps: CompositionDependency[]) {
  const result = {}
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

  console.info("heavy: " + JSON.stringify(importantDeps));
  let uniqIcons = uniqBy(icons, (e) => e.name);

  return {
    all: Object.keys(result),
    important: importantDeps,
    icons: uniqIcons,
  };
}

export function summaryStacks(deps: CompositionDependency[], system: SystemInfo): StackSummary {
  let language = system.language.toLowerCase();
  let summary: StackSummary;
  switch (language) {
    case "java":
      summary = sumJvm(deps);
      break;
    case "kotlin":
      summary = sumJvm(deps);
      break;
    case "typescript":
      summary = sumNpm(deps);
      break;
    case "javascript":
      summary = sumNpm(deps);
      break;
    default:
      summary = sumJvm(deps);
      break;
  }

  return summary;
}
