import { useRef, useState } from "react";
import { defaultModuleType } from "../config";
const createGlobalState = (defaultValue) => {
  const store = {
    state: defaultValue,
  };
  return () => {
    const [state, setState] = useState(store.state);
    const getState = () => {
      return store.state;
    };
    const updateState = (value) => {
      setState(value);
      store.state = value;
    };
    return [getState, updateState];
  };
};
const useModuleType = createGlobalState(defaultModuleType);
export default useModuleType;
