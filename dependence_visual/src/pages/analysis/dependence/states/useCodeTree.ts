import createCacheState from '@/utils/createCacheState';
import { getCodeTree } from '@/api/module/code-tree';

const useCodeTree = createCacheState(getCodeTree, {})
export default useCodeTree;
