import { ReplService } from "@/pages/interactiveAnalysis/coreEditor/ReplService";

export enum InteractiveAnalysisTheme {
  DARK = 'dark',
  WHITE = 'white'
}

export interface InteractiveAnalysisContext {
  replService: ReplService;
  theme: InteractiveAnalysisTheme
}
