import XLSX from "xlsx";
import { createGlobalState, useEffectOnce } from "react-use";
import { FormItemOption } from "./../models/form";

export const scrollToAnchor = (anchorName: string) => {
  if (anchorName) {
    // 找到锚点
    let anchorElement = document.getElementById(anchorName);
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) {
      anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
};

export const exportJsonToExcel = (data: any[], fileName: string) => {
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "data");
  XLSX.writeFile(workBook, fileName);
};

interface CacheState<T> {
  loading: boolean;
  value?: T;
}

/**
 * 创建一个全局缓存的状态，只会被自动加载一次，并随时可以手动刷新
 * @param {*} asyncFn 获取状态的异步方法
 * @param {*} defaultValue 默认值
 */
export default function createCacheState<T = any>(
  asyncFn: (systemId: number) => Promise<T>,
  defaultValue: T,
  systemId: number
): () => [CacheState<T> | undefined, () => void] {
  const useCacheValue = createGlobalState<CacheState<T>>({ loading: false, value: defaultValue });
  let loaded = false;

  return function () {
    const [state, setState] = useCacheValue();
    const load = () => {
      setState({ ...state, loading: true });
      asyncFn(systemId).then((v) => {
        setState({
          value: v,
          loading: false,
        });
      });
    };
    useEffectOnce(() => {
      if (!loaded) {
        loaded = true;
        load();
      }
    });

    return [state, load];
  };
}

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
    .filter((option) => option.label)
    .sort((optionA, optionB) => optionA.label.localeCompare(optionB.label));
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
    const nodeName = prefix ? `${ prefix }.${ packageNode.node }` : packageNode.node;
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

export function transformColorToRGBA(color: string, opacity: number) {
  color = color.toLowerCase();
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (color && reg.test(color)) {
    color = color.slice(1);
    if (color.length === 3) {
      color = color.replace(/(.)/g, "$1$1");
    }
    let rgbColor = [];
    for (let i = 0; i < 6; i += 2) {
      rgbColor.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return "rgba(" + rgbColor.join(",") + "," + opacity + ")";
  }

  return color;
}

export function lightenDarkenColor(col: string, amt: number) {
  var usePound = false;

  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

export const genID = (): string => {
  return Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36);
};

//直接获取接口字段的类型，ts 内置的 Pick 是将字段的类型包裹在接口内再返回
// type xxx = PickFieldType<{ name: string; }, 'name'>; // string
export type PickFieldType<T, K extends keyof T> = T[K];

export type ValueOf<T> = T[keyof T];
