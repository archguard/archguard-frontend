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

  const clearUndefinedChildren = (treeNodes: FormItemOption[]): FormItemOption[] => {
    return treeNodes.map((node) => {
      const children = clearUndefinedChildren(node.children!.filter(node => node))
      return {
        ...node,
        children: children.length ? children : undefined,
      }
    })
  }

  return Object.assign({},
    ...trees.map((tree) => {
      const treeNodes = tree.children.map((node) => transformNodeToOption(node)!)
      return {
        [tree.node]: toClass ? treeNodes : clearUndefinedChildren(treeNodes!)
      }
  }))
}
