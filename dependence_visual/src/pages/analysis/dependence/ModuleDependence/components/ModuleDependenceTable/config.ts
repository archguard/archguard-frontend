import { FormItemModel, FormItemOption } from '@/models/form';
import { Module } from '@/api/module/module';

export function buildFormItems(modules: Module[]): FormItemModel[] {
  const moduleOptions: FormItemOption[] = modules.map(module => {
    return { label: module.name, value: module.name }
  });
  return [
    {
      id: "moduleAName",
      label: "逻辑模块A",
      required: true,
      span: 12,
      type: "select",
      options: moduleOptions
    },
    {
      id: "moduleBName",
      label: "逻辑模块B",
      required: true,
      span: 12,
      type: "select",
      options: moduleOptions
    },
    {
      id: "className",
      label: "类名",
      span: 12
    },
    {
      id: "matchType",
      label: "匹配类型",
      type: "radio",
      options: [
        {label: "模糊匹配", value: "fuzz"},
        {label: "精确匹配", value: "exact"}
      ],
      span: 5
    },
    {
      id: "dependenceType",
      label: "依赖类型",
      type: "radio",
      options: [
        {label: "调用类", value: "callerClass"},
        {label: "被调用类", value: "calleeClass"}
      ],
      span: 5
    }
  ]
}
