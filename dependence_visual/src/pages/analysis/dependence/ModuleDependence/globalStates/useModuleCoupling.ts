import { createGlobalState } from "react-use";
import { ReportMapper } from '@/pages/metrics/ModuleCouplingTree/report';

const useModuleCoupling = createGlobalState<ReportMapper[]>([])
export default useModuleCoupling;
