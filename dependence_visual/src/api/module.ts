import { storage } from '@/store/storage/sessionStorage';
import { useGet } from './axios';
import { Overview } from './module/overview';

const systemId = storage.getSystemId();
export const baseURL = `/api/module/systems/${systemId}`;

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