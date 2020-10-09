import createCacheState from "@/utils/utils";
import { queryModule } from "@/api/module/module";

const useModules = createCacheState(queryModule, []);
export default useModules;
