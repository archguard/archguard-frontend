export interface ReactiveAction {
  actionType: string;
  className: string;
  graphType: string;
  data: string;
}

export interface ReplResult {
  resultValue: string;
  isArchdocApi: boolean;
  className: string;
  actionData: string;
  action: ReactiveAction;
}

export interface CellItem {
  id: string;
  code: string;
}
