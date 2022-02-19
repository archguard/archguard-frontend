import createCacheState from "@/utils/utils";
import { querySystemInfo } from "@/api/addition/systemInfo";

const useSystemList = createCacheState(querySystemInfo, []);
export default useSystemList;
