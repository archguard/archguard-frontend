import { createGlobalState } from "react-use";
import { defaultModuleType } from "../config";

const useModuleType = createGlobalState(defaultModuleType);
export default useModuleType;
