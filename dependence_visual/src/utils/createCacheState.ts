import { createGlobalState, useEffectOnce } from "react-use";

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
  asyncFn: () => Promise<T>,
  defaultValue: T,
): () => [CacheState<T> | undefined, () => void] {
  const useCacheValue = createGlobalState<CacheState<T>>({ loading: false, value: defaultValue });
  let loaded = false;

  return function () {
    const [state, setState] = useCacheValue();
    const load = () => {
      setState({ ...state, loading: true });
      asyncFn().then((v) => {
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
