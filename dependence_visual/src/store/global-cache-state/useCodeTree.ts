import createCacheState from '@/utils/createCacheState';
import { queryCodeTree } from '@/api/module/codeTree';

const useCodeTree = createCacheState(queryCodeTree, {})
export default useCodeTree;
