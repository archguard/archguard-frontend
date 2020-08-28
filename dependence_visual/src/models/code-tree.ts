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
  metric?: {
    QIA: number;
  };
}

interface PackageNode {
  name: string;
  packages?: PackageNode[];
  classess?: ClassNode[];
  metric?: {
    QIA: number;
  };
}

interface ClassNode {
  name: string;
  metric?: {
    IFI: number;
  };
}
