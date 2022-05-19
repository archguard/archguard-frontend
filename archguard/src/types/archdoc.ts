export interface ReactiveAction {
  actionType: string;
  className: string;
  graphType: string;
  data: string;
}

export enum MsgType {
  None = "none",
  ERROR = "error",
  ARCHGUARD_GRAPH = "archguard_graph"
}

export interface ReplResult {
  id: number;
  resultValue: string;
  className: string;
  msgType: MsgType;
  content: object;
  action: ReactiveAction;
}

export interface CellItem {
  id: string;
  code: string;
}
