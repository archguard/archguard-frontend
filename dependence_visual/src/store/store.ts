import initStore from "react-vuex-hook";
import { IOptions } from "react-vuex-hook/lib/types";

type ThresholdKey =
  | "oversizedMethodByLine"
  | "oversizedClassByLine"
  | "oversizedClassByCount"
  | "oversizedPackageByLine"
  | "oversizedPackageByCount"
  | "oversizedModuleByLine"
  | "oversizedModuleByCount"
  | "moduleDependencies"
  | "packageDependencies"
  | "classDependencies"
  | "methodDependencies"
  | "lackOfLCOM4"
  | "inheritanceDepth";
type State = {
  [key in ThresholdKey]: any;
};

const store: IOptions<State, string, string, string> = {
  // 初始状态
  getInitState: () => {
    return {
      oversizedMethodByLine: 30,
      oversizedClassByLine: 600,
      oversizedClassByCount: 20,
      oversizedPackageByLine: 12000,
      oversizedPackageByCount: 20,
      oversizedModuleByLine: 240000,
      oversizedModuleByCount: 20,
      moduleDependencies: 8,
      packageDependencies: 8,
      classDependencies: 8,
      methodDependencies: 8,
      lackOfLCOM4: 6,
      inheritanceDepth: 6,
    };
  },
  // 同步操作 必须返回state的拷贝值
  mutations: {
    updateThresholdState(state: State, payload): State {
      return Object.assign({}, state, { ...payload });
    },
  },
  // 异步操作，拥有 dispatch 的执行权
  actions: {},
  // 计算属性 根据state里的值动态计算
  // 在页面中根据state值的变化而动态变化
  getters: {},
};

export const { connect, useStore } = initStore(store);
