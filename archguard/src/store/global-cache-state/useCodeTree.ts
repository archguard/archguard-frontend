import createCacheState from "@/utils/utils";
import { queryCodeTree } from "@/api/module/codeTree";

const useCodeTree = (systemId: number) => {
  return createCacheState(queryCodeTree, {}, systemId)();
}
export default useCodeTree;
