import { LivingCodeFenceExtension } from "@/pages/workbench/coreEditor/extension/LivingCodeFenceExtension";

export class LivingCodeBlockExtension extends LivingCodeFenceExtension {
  get name() {
    return "code_block";
  }

  get markdownToken() {
    return "code_block";
  }
}
