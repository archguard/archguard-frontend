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
  const trees = expandCodeTree(codeTree);

  const transformPackageToOption = (pkg: PackageNode): FormItemOption | undefined => {
    let children = pkg.packages?.map((p) => transformPackageToOption(p)!) || [];

    if (toClass) {
      const classChildren =
        pkg.classess?.map((c) => {
          return {
            label: c.name,
            value: c.name,
          };
        }) || [];

      children = children.concat(classChildren);
    }

    return {
      label: pkg.name,
      value: pkg.name,
      children: children,
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
      let treeNodes = tree.packages?.map((node) => transformPackageToOption(node)!) || [];
      if (toClass) {
        const classChildren =
          tree.classess?.map((c) => {
            return {
              label: c.name,
              value: c.name,
            };
          }) || [];

        treeNodes = treeNodes.concat(classChildren);
      }
      return {
        [tree.name]: toClass ? treeNodes : clearUndefinedChildren(treeNodes!),
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
