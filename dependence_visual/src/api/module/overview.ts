import { axiosWithModule } from './config';
export interface Overview {
  badSmell: string,
  category: string,
  count: number,
}

export function getOverview() {
  return axiosWithModule<{
    data: Overview[];
  }>({
    url: '/overview',
    method: 'GET'
  });
}