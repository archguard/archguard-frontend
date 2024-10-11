import { createGlobalState } from "react-use";
import { ReportMapper } from "@/pages/system/metric/ModuleCouplingTree/Report";

const useModuleCoupling = createGlobalState<ReportMapper[]>([]);
export default useModuleCoupling;
