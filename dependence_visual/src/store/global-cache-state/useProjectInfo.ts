import createCacheState from "@/utils/createCacheState";
import { queryProjectInfo } from '@/api/addition/projectInfo';

const useProjectInfo = createCacheState(queryProjectInfo, []);
export default useProjectInfo;
