import { FormItemOption } from './../models/form';

export function transformCodeTreeToModuleOptions (codeTree: CodeTree): FormItemOption[] {
  const trees = codeTree.trees || []

  return trees.map((tree) => {
    if (tree.type === 'SUB_MODULE') {
      return {
        label: tree.node,
        value: tree.node,
      }
    }
    return { label: '', value: '' }
  }).filter(option => option.label)
}

export function transformCodeTreeToCascaderOptions(codeTree: CodeTree, toClass: boolean): {
  [key: string]: FormItemOption[]
} {
  const trees = codeTree.trees || []

  const transformNodeToOption = (node: TreeNode): FormItemOption | undefined => {
    if (node.type === 'FILE') {
      return toClass ? {
        label: node.node,
        value: node.node,
      } : undefined
    }

    return {
      label: node.node,
      value: node.node,
      children: node.children.map(node => transformNodeToOption(node)!),
    }
  }

  return Object.assign({},
    ...trees.map((tree) => {
    return {
      [tree.node]: tree.children.map((node) => transformNodeToOption(node)!)
    }
  }))
}
