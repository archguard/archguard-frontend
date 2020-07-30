import { every, filter, findIndex, forEach } from "lodash";
import { JMethod, JClass, JavaItem } from "../../../models/java";
import { TreeNode, Node, Edge, GraphData } from "../../../models/graph";

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

const createTreeNode = <T extends JavaItem, U = TreeNode<T>>(
  javaItem: T,
  treeNodeMap: { [key: string]: U },
  createMethod: (javaItem: T) => U,
): U => {
  const { id } = javaItem;
  if (!treeNodeMap[id]) {
    treeNodeMap[id] = createMethod(javaItem);
  }
  return treeNodeMap[id];
};

export const buildMethodTree = (jMethods: JMethod[]) => {
  const parentsKey = "callers";
  const childrenKey = "callees";
  const implementKey = "implements";
  const treeNodeMap: { [key: string]: TreeNode<JMethod> } = {};

  const travelMethods = (jMethod: JMethod) => {
    const parentMethods = jMethod[parentsKey];
    const childrenMethods = jMethod[childrenKey];
    const methodImplements = jMethod[implementKey];
    const treeNode = createTreeNode<JMethod>(jMethod, treeNodeMap, createJMethodNode);
    forEach(parentMethods, (parentMethod) => {
      const parentTreeNode = createTreeNode<JMethod>(parentMethod, treeNodeMap, createJMethodNode);
      pushNode(treeNode, parentTreeNode.children);
      pushNode(parentTreeNode, treeNode.parents);
      travelMethods(parentMethod);
    });

    forEach(childrenMethods, (childMethod) => {
      const childTreeNode = createTreeNode<JMethod>(childMethod, treeNodeMap, createJMethodNode);
      pushNode(childTreeNode, treeNode.children);
      pushNode(treeNode, childTreeNode.parents);
      travelMethods(childMethod);
    });

    forEach(methodImplements, (implementMethod) => {
      const implementTreeNode = createTreeNode<JMethod>(
        implementMethod,
        treeNodeMap,
        createJMethodNode,
      );
      implementTreeNode.isImplement = true;
      pushNode(implementTreeNode, treeNode.children);
      pushNode(treeNode, implementTreeNode.parents);
      travelMethods(implementMethod);
    });
  };

  forEach(jMethods, (jMethod) => {
    travelMethods(jMethod);
  });

  const rootNodes: TreeNode<JMethod>[] = filter(treeNodeMap, (node) => node.parents.length === 0);

  return rootNodes;
};

export const buildClassDependenceTree = (jClass: JClass): TreeNode<JClass>[] => {
  const parentsKey = "dependencers";
  const childrenKey = "dependencees";
  const treeNodeMap: { [key: string]: TreeNode<JClass> } = {};

  const travelJClasses = (jClass: JClass): void => {
    const treeNode = createTreeNode<JClass>(jClass, treeNodeMap, createJClassNode);
    const parentJClasses = jClass[parentsKey];
    const childrenJClasses = jClass[childrenKey];

    forEach(parentJClasses, (parentJClass) => {
      const parentTreeNode = createTreeNode<JClass>(parentJClass, treeNodeMap, createJClassNode);
      pushNode(treeNode, parentTreeNode.children);
      pushNode(parentTreeNode, treeNode.parents);
      travelJClasses(parentJClass);
    });

    forEach(childrenJClasses, (childJClass) => {
      const childTreeNode = createTreeNode<JClass>(childJClass, treeNodeMap, createJClassNode);
      pushNode(childTreeNode, treeNode.children);
      pushNode(treeNode, childTreeNode.parents);
      travelJClasses(childJClass);
    });
  };

  travelJClasses(jClass);

  const rootNodes: TreeNode<JClass>[] = filter(treeNodeMap, (node) => node.parents.length === 0);
  return rootNodes;
};

export const buildClassInvokesTree = (jClass: JClass): TreeNode<JClass>[] => {
  const parentsKey = "callers";
  const childrenKey = "callees";
  const treeNodeMap: { [key: string]: TreeNode<JClass> } = {};

  const travelJClasses = (jClass: JClass): void => {
    const treeNode = createTreeNode<JClass>(jClass, treeNodeMap, createJClassNode);
    const parentJClasses = jClass[parentsKey];
    const childrenJClasses = jClass[childrenKey];

    forEach(parentJClasses, (parentJClass) => {
      const clazz = parentJClass.clazz;
      const parentTreeNode = createTreeNode<JClass>(clazz, treeNodeMap, createJClassNode);
      pushNode(treeNode, parentTreeNode.children);
      pushNode(parentTreeNode, treeNode.parents);
      travelJClasses(clazz);
    });

    forEach(childrenJClasses, (childJClass) => {
      const clazz = childJClass.clazz;
      const childTreeNode = createTreeNode<JClass>(clazz, treeNodeMap, createJClassNode);
      pushNode(childTreeNode, treeNode.children);
      pushNode(treeNode, childTreeNode.parents);
      travelJClasses(clazz);
    });
  };

  travelJClasses(jClass);

  const rootNodes: TreeNode<JClass>[] = filter(treeNodeMap, (node) => node.parents.length === 0);
  return rootNodes;
};

export const buildClassMethodInvokesTree = (jClass: JClass): TreeNode<JMethod>[] => {
  const parentsKey = "callers";
  const childrenKey = "callees";
  const jMethods: JMethod[] = jClass["methods"];
  const treeNodeMap: { [key: string]: TreeNode<JMethod> } = {};

  const travelJMethod = (jMethod: JMethod): void => {
    const treeNode = createTreeNode<JMethod>(jMethod, treeNodeMap, createJMethodNode);
    const parentJMethods = jMethod[parentsKey];
    const childrenJMethods = jMethod[childrenKey];

    forEach(parentJMethods, (parentJMethod) => {
      const parentTreeNode = createTreeNode<JMethod>(parentJMethod, treeNodeMap, createJMethodNode);
      pushNode(treeNode, parentTreeNode.children);
      pushNode(parentTreeNode, treeNode.parents);
      travelJMethod(parentJMethod);
    });

    forEach(childrenJMethods, (childJMethod) => {
      const childTreeNode = createTreeNode<JMethod>(childJMethod, treeNodeMap, createJMethodNode);
      pushNode(childTreeNode, treeNode.children);
      pushNode(treeNode, childTreeNode.parents);
      travelJMethod(childJMethod);
    });
  };

  forEach(jMethods, travelJMethod);

  const rootNodes: TreeNode<JMethod>[] = filter(treeNodeMap, (node) => node.parents.length === 0);
  return rootNodes;
};

export const generateNodeEdges = <T>(rootNodes: TreeNode<T>[]): GraphData => {
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
  return {
    nodes,
    edges,
  };
};
