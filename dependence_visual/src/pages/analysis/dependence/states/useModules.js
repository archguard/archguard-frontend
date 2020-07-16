import createCacheState from "@/utils/createCacheState";
import { queryModule } from "@/api/module/module";

const useModules = createCacheState(queryModule, []);
export default useModules;
