type TreeNode = {
  node: string,
  type: 'SUB_MODULE' | 'PACKAGE' | 'FILE',
  children: TreeNode[],
}

interface CodeTree {
  trees?: TreeNode[],
}
