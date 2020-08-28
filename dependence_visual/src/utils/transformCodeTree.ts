import { FormItemOption } from "./../models/form";

export function transformCodeTreeToModuleOptions(codeTree: CodeTree): FormItemOption[] {
  const trees = codeTree.trees || [];

  return trees
    .map((tree) => {
      if (tree.type === "SUB_MODULE") {
        return {
          label: tree.node,
          value: tree.node,
        };
      }
      return { label: "", value: "" };
    })
    .filter((option) => option.label);
}

export function transformCodeTreeToCascaderOptions(
  codeTree: CodeTree,
  toClass: boolean,
): {
  [key: string]: FormItemOption[];
} {
  const trees = codeTree.trees || [];

  const transformNodeToOption = (node: TreeNode): FormItemOption | undefined => {
    if (node.type === "FILE") {
      return toClass
        ? {
            label: node.node,
            value: node.node,
          }
        : undefined;
    }

    return {
      label: node.node,
      value: node.node,
      children: node.children.map((node) => transformNodeToOption(node)!),
    };
  };

  const clearUndefinedChildren = (treeNodes: FormItemOption[]): FormItemOption[] => {
    return treeNodes.map((node) => {
      const children = clearUndefinedChildren(node.children!.filter((node) => node));
      return {
        ...node,
        children: children.length ? children : undefined,
      };
    });
  };

  return Object.assign(
    {},
    ...trees.map((tree) => {
      const treeNodes = tree.children.map((node) => transformNodeToOption(node)!);
      return {
        [tree.node]: toClass ? treeNodes : clearUndefinedChildren(treeNodes!),
      };
    }),
  );
}

export function expandCodeTree(codeTree: CodeTree) {
  const subModule = codeTree.trees || [];

  const mapModule = (module: TreeNode) => {
    const node: SubModuleNode = {
      name: module.node,
    };

    const packages = module.children.filter((n) => n.type === "PACKAGE");
    node.packages = packages.map((p) => mapPackageNode(p));

    const classess = module.children.filter((n) => n.type === "FILE");
    node.classess = classess.map((c) => ({ name: c.node }));

    return node;
  };

  const mapPackageNode = (packageNode: TreeNode, prefix?: string): PackageNode => {
    const nodeName = prefix ? `${prefix}.${packageNode.node}` : packageNode.node;
    const node: PackageNode = {
      name: nodeName,
    };

    if (!packageNode.children || packageNode.children.length === 0) {
      return node;
    }

    if (packageNode.children.length === 1 && packageNode.children[0].type === "PACKAGE") {
      prefix = nodeName;
      return mapPackageNode(packageNode.children[0], prefix);
    } else {
      const packages = packageNode.children.filter((n) => n.type === "PACKAGE");
      node.packages = packages.map((p) => mapPackageNode(p));

      const classess = packageNode.children.filter((n) => n.type === "FILE");
      node.classess = classess.map((c) => ({ name: c.node }));

      return node;
    }
  };

  const moduleNode = subModule?.map(mapModule);

  return moduleNode;
}
