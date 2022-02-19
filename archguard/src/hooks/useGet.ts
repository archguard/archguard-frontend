import { axiosInstance } from '@/api/axios';
import { useState, useEffect } from 'react';

interface UseGetOption {
  manual?: boolean;//是否手动触发，若为 true，即组件加载时不会触发请求
}

export function useGet<T>(url: string, option?: UseGetOption) {
  const [data, setData] = useState<T>();
  const run = (params?: { [p: string]: any; }) => {
    axiosInstance.get<string, T>(url, { params }).then(res => setData(res));
  };
  useEffect(() => { if (!option?.manual) { run(); } }, []);
  return { data, run };
}
