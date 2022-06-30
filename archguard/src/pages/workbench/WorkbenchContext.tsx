import { ReplService } from "@/pages/workbench/coreEditor/ReplService";

export enum WorkbenchTheme {
  DARK = 'dark',
  WHITE = 'white'
}

export interface WorkbenchContext {
  replService: ReplService;
  theme: WorkbenchTheme
}
