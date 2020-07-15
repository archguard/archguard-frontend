import {createGlobalState, useEffectOnce} from "react-use";

/**
 * 创建一个全局缓存的状态，只会被自动加载一次，并随时可以手动刷新
 * @param {*} asyncFn 获取状态的异步方法
 * @param {*} defaultValue 默认值
 */
export default function createCacheState(asyncFn, defaultValue) {
  const useCacheValue = createGlobalState({loading: false, value: defaultValue});
  let loaded = false;
  return function () {
    const [state, setState] = useCacheValue()
    const load = () => {
      setState({...state, loading: true})
      asyncFn().then(v => {
        setState({
          value: v,
          loading: false
        })
      })
    }
    useEffectOnce(() => {
      if (!loaded) {
        loaded = true;
        load();
      }
    })

    return [state, load]
  }
}
