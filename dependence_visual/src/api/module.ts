import { storage } from '@/store/storage/sessionStorage';
import { useGet } from './axios';

const systemId = storage.getSystemId();
export const baseURL = `/api/module/systems/${systemId}`;

interface Overview {
  badSmell: string,
  category: string,
  count: number,
}
interface UseOverview {
  data: Overview[];
}

export function useOverview() {
  const { data, run } = useGet<UseOverview>(`${baseURL}/overview`);
  return {
    data: data?.data || [],
    run
  };
}