import { useLocation } from "umi";

export default function useUrlQuery<T = { [key: string]: string }>() {
  const location = (useLocation() as unknown) as { query: T };
  return location.query ?? {};
}
