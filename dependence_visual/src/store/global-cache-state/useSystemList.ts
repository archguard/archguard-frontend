import createCacheState from "@/utils/createCacheState";
import { querySystemInfo } from '@/api/addition/systemInfo';

const useSystemList = createCacheState(querySystemInfo, []);
export default useSystemList;
