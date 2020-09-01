import createCacheState from "@/utils/createCacheState";
import { queryAllQualityGateProfile } from "@/api/module/profile";

const useQualityGate = createCacheState(queryAllQualityGateProfile, []);
export default useQualityGate;
