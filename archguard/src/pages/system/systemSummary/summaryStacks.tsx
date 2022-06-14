import { CompositionDependency } from "@/api/module/project";
import { uniqBy } from "lodash";

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

export function summaryStacks(deps: CompositionDependency[]) {
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
