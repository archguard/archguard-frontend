import { createGlobalState } from "react-use";
import { ReportMapper } from "@/pages/analysis/metrics/ModuleCouplingTree/report";

const useModuleCoupling = createGlobalState<ReportMapper[]>([]);
export default useModuleCoupling;
