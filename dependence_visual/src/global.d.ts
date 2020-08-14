declare class ELK {
  constructor(options: any) {}
  layout(data: any): Promise<any>;
}

declare module "elkjs" {
  export = ELK;
}
