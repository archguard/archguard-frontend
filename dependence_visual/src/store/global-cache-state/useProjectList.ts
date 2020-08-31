import createCacheState from "@/utils/createCacheState";
import { queryProjectInfo } from '@/api/addition/projectInfo';

const useProjectList = createCacheState(queryProjectInfo, []);
export default useProjectList;
