import { createGlobalState } from "react-use";
import { ReportMapper } from "@/pages/system/metrics/ModuleCouplingTree/Report";

const useModuleCoupling = createGlobalState<ReportMapper[]>([]);
export default useModuleCoupling;
