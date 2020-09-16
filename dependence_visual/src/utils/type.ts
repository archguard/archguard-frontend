//直接获取接口字段的类型，ts 内置的 Pick 是将字段的类型包裹在接口内再返回
// type xxx = PickFieldType<{ name: string; }, 'name'>; // string
export type PickFieldType<T, K extends keyof T> = T[K]; 
