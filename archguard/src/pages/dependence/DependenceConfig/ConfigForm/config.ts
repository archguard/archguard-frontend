import { FormItemModel } from '@/types/form';

export interface ConfigType {
  type: string;
  label: string;
  formItems: FormItemModel[];
}

export interface ConfigData {
  [key: string]: {
    key: string;
    type: string;
    value: string;
    order?: number;
  }[]
}

export const configType: ConfigType[] = [
  {
    type: "nodeColor",
    label: "着色配置",
    formItems: [
      {
        id: "key", label: "类名/方法名", type: 'text', defaultValue: '',
        rules: [{ required: true, message: "请输入类名/方法名！" }]
      },
      { id: "order", label: "应用顺序", type: "number", defaultValue: 1, },
      {
        id: "value", label: "颜色", type: "color", defaultValue: "#ffffff",
      }
    ]
  },
  {
    type: "nodeDisplay",
    label: "分析范围配置",
    formItems: [
      {
        id: "value", label: "分析范围类型", type: "select", defaultValue: "hidden",
        options: [
          { label: "隐藏", value: "hidden" },
          { label: "仅包含", value: "contain" }
        ],
      },
      {
        id: "key", label: "类名/方法名", type: 'text', defaultValue: '',
        rules: [{ required: true, message: "请输入类名/方法名！" }]
      }
    ]
  }
];
