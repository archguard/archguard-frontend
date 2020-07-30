import { FormItemModel } from '@/models/form';

export interface ConfigType {
  type: string;
  label: string;
  formItems: FormItemModel[];
}

export const configType: ConfigType[] = [
  {
    type: "plugin",
    label: "插件配置",
    formItems: [
      {
        id: "key", label: "配置属性", type: 'select', defaultValue: 'name',
        options: [
          { label: "插件名", value: "name" },
        ],
      },
      {
        id: "value", label: "配置值", type: "select",
        options: [
          { label: "Dubbo分析", value: "DUBBO" },
          { label: "FeignClient分析", value: "FEIGN_CLIENT" },
        ],
      },
      { id: "order", label: "应用顺序", type: "number", defaultValue: 1, }
    ]
  },
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
    type: "nodeHidden",
    label: "隐藏配置",
    formItems: [
      {
        id: "key", label: "隐藏类型", type: "select", defaultValue: "Fuzzy",
        options: [
          { label: "模糊匹配", value: "Fuzzy" },
          { label: "全匹配", value: "Full" },
        ],
      },
      {
        id: "value", label: "类名/方法名", type: 'text', defaultValue: '',
        rules: [{ required: true, message: "请输入类名/方法名！" }]
      },
    ]
  },
  {
    type: "analysisScope",
    label: "分析范围配置",
    formItems: [
      {
        id: "key", label: "分析范围类型", type: "select", defaultValue: "contains",
        options: [
          { label: "包含", value: "contains" }
        ],
      },
      {
        id: "value", label: "类名/方法名", type: 'text', defaultValue: '',
        rules: [{ required: true, message: "请输入类名/方法名！" }]
      },
      { id: "order", label: "应用顺序", type: "number", defaultValue: 1 }
    ]
  }
];
