import { CompositionDependency } from "@/api/module/project";
import { SystemInfo } from "@/api/addition/systemInfo";
import { stackNpm } from "@/pages/system/systemSummary/Summary/stacks/stackNpm";
import { stackJvm } from "@/pages/system/systemSummary/Summary/stacks/stackJvm";

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
      summary = stackJvm(deps);
      break;
    case "kotlin":
      summary = stackJvm(deps);
      break;
    case "typescript":
      summary = stackNpm(deps);
      break;
    case "javascript":
      summary = stackNpm(deps);
      break;
    default:
      summary = stackJvm(deps);
      break;
  }

  return summary;
}
