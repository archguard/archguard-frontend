interface FormItemOption {
  value: string;
  label: string;
}

export class FormItemModel {
  id: string;
  label?: string;
  type?: string;
  defaultValue?: string | number;
  rules?: any[];
  style?: Object | undefined;
  min?: number;
  max?: number;
  options?: FormItemOption[];
  mode?: any;
  tokenSeparators?: string[];
  required?: boolean;
  validate?: Function;
  span?: number;

  constructor() {
    this.id = ''
  }
}
