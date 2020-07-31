export interface FormItemOption {
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
    this.id = "";
  }
}

export type ButtonConfig = {
  text: string;
  id: string;
  type: string;
  span: number;
};

export type Validator = {
  isValidate: boolean;
  message?: string;
};
