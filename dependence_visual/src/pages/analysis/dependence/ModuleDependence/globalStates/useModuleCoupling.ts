import {createGlobalState} from "react-use";
import { ReportMapper } from '../components/ModuleCouplingTree/report';

const useModuleCoupling = createGlobalState<ReportMapper[]>([])
export default useModuleCoupling;
