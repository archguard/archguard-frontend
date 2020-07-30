export enum ClassType {
  INTERFACE,
  CLASS,
  NOT_DEFINED,
}

export interface JavaItem {
  id: string;
  name: string;
  module?: string;
}

export interface ClassCall {
  clazz: JClass;
}

export interface JClass extends JavaItem {
  callees: ClassCall[];
  callers: ClassCall[];
  classType: ClassType.NOT_DEFINED;
  dependencees: JClass[];
  dependencers: JClass[];
  fullName: string[];
  id: string;
  implements: JClass[];
  interface: boolean;
  methods: JMethod[];
  module: string;
  name: string;
  parents: JClass[];
}

export interface JMethod extends JavaItem {
  id: string;
  module: string;
  clazz: string;
  name: string;
  argumentTypes: string[];
  returnType: string;
  callees: JMethod[];
  callers: JMethod[];
  parents: JMethod[];
  implements: JMethod[];
}

export interface JModule extends JavaItem {}
export interface JNode {
  id: string;
  fullName: string;
  title: string;
  properties: { [key: string]: string | number };
}

export interface JEdge {
  a: string;
  b: string;
  lables?: string[];
  num?: number;
}
