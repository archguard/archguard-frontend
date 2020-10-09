import createCacheState from "@/utils/utils";
import { queryCodeTree } from "@/api/module/codeTree";

const useCodeTree = createCacheState(queryCodeTree, {});
export default useCodeTree;
