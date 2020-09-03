type TreeNode = {
  node: string;
  type: "SUB_MODULE" | "PACKAGE" | "FILE";
  children: TreeNode[];
};

interface CodeTree {
  trees?: TreeNode[];
}

interface SubModuleNode {
  name: string;
  packages?: PackageNode[];
  classess?: ClassNode[];
}

interface PackageNode {
  name: string;
  packages?: PackageNode[];
  classess?: ClassNode[];
}

interface ClassNode {
  name: string;
}
