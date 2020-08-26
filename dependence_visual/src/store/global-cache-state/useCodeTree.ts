import createCacheState from '@/utils/createCacheState';
import { queryCodeTree } from '@/api/module/code-tree';

const useCodeTree = createCacheState(queryCodeTree, {})
export default useCodeTree;
