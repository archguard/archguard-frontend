import { CompositionDependency } from "@/api/module/project";
import { SystemInfo } from "@/api/addition/systemInfo";
import { stackNpm } from "@/pages/system/systemSummary/Summary/stacks/stackNpm";
import { sumJvm } from "@/pages/system/systemSummary/Summary/stacks/stackJvm";

export interface StackIcon {
  name: string;
  img: string;
}

export interface StackSummary {
  all: string[];
  important: any;
  icons: StackIcon[];
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
      summary = stackNpm(deps);
      break;
    case "javascript":
      summary = stackNpm(deps);
      break;
    default:
      summary = sumJvm(deps);
      break;
  }

  return summary;
}
