import { every, filter, findIndex, forEach } from "lodash";
enum ClassType {
  INTERFACE,
  CLASS,
  NOT_DEFINED,
}

interface JavaItem {
  id: string;
  name: string;
  module: string;
}

interface JClass extends JavaItem {
  callees: JClass[];
  callers: JClass[];
  classType: ClassType.NOT_DEFINED;
  dependencees: JClass[];
  dependencers: JClass[];
  fullName: string[];
  id: string;
  implements: JClass[];
  interface: boolean;
  methods: JClass;
  module: string;
  name: string;
  parents: JClass[];
}

interface TreeNode<T> {
  id: string;
  name: string;
  module: string;
  parents: TreeNode<T>[];
  children: TreeNode<T>[];
  isImplement?: boolean;
}

interface JMethod extends JavaItem {
  id: string;
  module: string;
  clazz: string;
  name: string;
  argumentTypes: string[];
  returnType: string;
  callees: JMethod[];
  callers: JMethod[];
  parents: JMethod[];
  implements: JMethod[];
}

type Node = {
  id: string;
  title: string;
  properties: { [key: string]: string };
  isImplement?: boolean;
};
type Edge = {
  a: string;
  b: string;
  labels?: string;
  num?: number;
};

const createJMethodNode = (jMethod: JMethod): TreeNode<JMethod> => {
  const { id, name, module, clazz } = jMethod;
  return {
    id,
    name: `${clazz}.${name}`,
    module,
    parents: [],
    children: [],
  };
};

const createJClassNode = (jItem: JClass): TreeNode<JClass> => {
  const { id, name, module } = jItem;
  return {
    id,
    name,
    module,
    parents: [],
    children: [],
  };
};

const pushNode = <T>(node: TreeNode<T>, nodes: TreeNode<T>[]) => {
  const notExist = every(nodes, (item) => item.id !== node.id);
  if (notExist) {
    nodes.push(node);
  }
};

const normalizeTreeNode = <T extends JavaItem>(
  node: TreeNode<T>,
  javaItem: JavaItem,
  treeNodeMap: { [key: string]: TreeNode<T> },
  pushCallback: (treeNode: TreeNode<T>) => void,
  createTreeNode: (node: T) => TreeNode<T>,
) => {
  const { id } = javaItem;
  if (!treeNodeMap[id]) {
    treeNodeMap[id] = createTreeNode(javaItem as T);
  }
  const treeNode = treeNodeMap[id];
  const isNotSame = id !== node.id;
  if (isNotSame) {
    pushCallback(treeNode);
  }
};

const appendToParents = <T extends JClass | JMethod>(
  node: TreeNode<T>,
  dependenceParents: T[],
  parentsKey: keyof T,
  treeNodeMap: { [key: string]: TreeNode<T> },
  createTreeNode: (node: T) => TreeNode<T>,
) => {
  forEach(dependenceParents, (dependenceParent) => {
    normalizeTreeNode<T>(
      node,
      dependenceParent,
      treeNodeMap,
      (parentNode: TreeNode<T>) => {
        pushNode(node, parentNode.children);
        pushNode(parentNode, node.parents);

        appendToParents(
          parentNode,
          (dependenceParent[parentsKey] as any) as T[],
          parentsKey,
          treeNodeMap,
          createTreeNode,
        );
      },
      createTreeNode,
    );
  });
};

const appendChildren = <T extends JClass | JMethod>(
  node: TreeNode<T>,
  dependenceChildren: T[],
  childrenKey: keyof T,
  treeNodeMap: { [key: string]: TreeNode<T> },
  createTreeNode: (node: any) => TreeNode<T>,
) => {
  forEach(dependenceChildren, (dependenceChild) => {
    normalizeTreeNode(
      node,
      dependenceChild,
      treeNodeMap,
      (childNode: TreeNode<T>) => {
        pushNode(childNode, node.children);
        pushNode(node, childNode.parents);

        appendChildren(
          childNode,
          (dependenceChild[childrenKey] as any) as T[],
          childrenKey,
          treeNodeMap,
          createTreeNode,
        );
      },
      createTreeNode,
    );
  });
};

export const buildMethodTree = (jMethods: JMethod[]) => {
  const parentsKey = "callers";
  const childrenKey = "callees";
  const implementKey = "implements";
  const treeNodeMap: { [key: string]: TreeNode<JMethod> } = {};

  const getTreeNode = (jMethod: JMethod): TreeNode<JMethod> => {
    const { id } = jMethod;
    if (!treeNodeMap[id]) {
      treeNodeMap[id] = createJMethodNode(jMethod);
    }
    return treeNodeMap[id];
  };

  const travelMethods = (jMethod: JMethod) => {
    const parentMethods = jMethod[parentsKey];
    const childrenMethods = jMethod[childrenKey];
    const methodImplements = jMethod[implementKey];
    const treeNode = getTreeNode(jMethod);
    forEach(parentMethods, (parentMethod) => {
      const parentTreeNode = getTreeNode(parentMethod);
      pushNode(treeNode, parentTreeNode.children);
      pushNode(parentTreeNode, treeNode.parents);
      travelMethods(parentMethod);
    });
    forEach(childrenMethods, (childMethod) => {
      const childTreeNode = getTreeNode(childMethod);
      pushNode(childTreeNode, treeNode.children);
      pushNode(treeNode, childTreeNode.parents);
      travelMethods(childMethod);
    });
    forEach(methodImplements, (implementMethod) => {
      const implementTreeNode = getTreeNode(implementMethod);
      implementTreeNode.isImplement = true;
      pushNode(implementTreeNode, treeNode.children);
      pushNode(treeNode, implementTreeNode.parents);
      travelMethods(implementMethod);
    });
  };

  forEach(jMethods, (jMethod) => {
    const treeNode = createJMethodNode(jMethod);
    treeNodeMap[treeNode.id] = treeNode;
    travelMethods(jMethod);
  });

  const rootNodes: TreeNode<JMethod>[] = filter(treeNodeMap, (node) => node.parents.length === 0);

  return rootNodes;
};

export const buildClassTree = (jClass: JClass): TreeNode<JClass>[] => {
  const parentsKey = "dependencers";
  const childrenKey = "dependencees";
  const treeNodeMap: { [key: string]: TreeNode<JClass> } = {};

  const treeNode = createJClassNode(jClass);
  treeNodeMap[treeNode.id] = treeNode;

  appendToParents(treeNode, jClass[parentsKey], parentsKey, treeNodeMap, createJClassNode);
  appendChildren(treeNode, jClass[childrenKey], childrenKey, treeNodeMap, createJClassNode);

  const rootNodes: TreeNode<JClass>[] = filter(treeNodeMap, (node) => node.parents.length === 0);
  return rootNodes;
};

export const generateNodeEdges = <T>(
  rootNodes: TreeNode<T>[],
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const travelNode = (node: TreeNode<T>, path: string[]) => {
    path.push(node.id);

    nodes.push({ id: node.id, title: node.name, properties: {}, isImplement: node.isImplement });

    const { children } = node;
    forEach(children, (childNode) => {
      const isNotLoop = path.indexOf(childNode.id) === -1;
      if (isNotLoop) {
        const edgeExist =
          findIndex(edges, (edge) => edge.a === node.id && edge.b === childNode.id) === -1;
        if (edgeExist) {
          edges.push({ a: node.id, b: childNode.id });
        }
        travelNode(childNode, path);
      }
    });
    path.pop();
  };

  forEach(rootNodes, (node) => {
    travelNode(node, []);
  });
  console.log(nodes);
  return {
    nodes,
    edges,
  };
};
