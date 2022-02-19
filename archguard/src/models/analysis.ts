export type Metric = {
  type: "MODULE" | "PACKAGE" | "CLASS";
  fullName: string;
  moduleName: string;
  props: MetricProps[];
};

export type MetricProps = {
  desc: string;
  name: string;
  value: any;
  key: string;
  qualified: boolean;
};
