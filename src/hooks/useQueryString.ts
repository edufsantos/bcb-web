/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchListRequest } from "@interfaces/api";
import qs from "qs";
import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type UseQuery<T, O> = [
  query: FetchListRequest<T, O>,
  setQuery: (data: FetchListRequest<T, O>) => void
];

const useQueryString = <T = any, O = any>(
  defaultQuery?: FetchListRequest<T, O>
): UseQuery<T, O> => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const query = useMemo(
    () => qs.parse(search, { ignoreQueryPrefix: true }),
    [search]
  );

  const setQuery = useCallback((data: FetchListRequest<T, O>) => {
    navigate({ pathname, search: qs.stringify(data) }, { replace: true });
  }, []);

  useEffect(() => {
    if (!search && defaultQuery) {
      setQuery(defaultQuery);
    }
  }, []);

  return [query, setQuery];
};

export default useQueryString;
