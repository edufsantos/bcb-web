import { useCallback, useEffect } from "react";
import useQueryString from "./useQueryString";

interface UsePagination {
  page: number;
  pages: number;
  skip: number;
  take: number;
  nextPage: () => void;
  prevPage: () => void;
  setSkip: (skip: number) => void;
}

const usePagination = (count: number): UsePagination => {
  const [query, setQueryString] = useQueryString();
  const take = Number(query.take ?? 15);
  const skip = Number(query.skip ?? 0);

  useEffect(() => {
    setQueryString({ ...query, skip, take });
  }, []);

  const setSkip = useCallback(
    (skip: number) => {
      setQueryString({ ...query, skip, take });
    },
    [query]
  );

  const nextPage = useCallback(() => {
    setSkip(skip + take);
  }, [query]);

  const prevPage = useCallback(() => {
    setSkip(Math.max(skip - take, 0));
  }, [query]);

  return {
    page: skip / take + 1,
    pages: Math.ceil(count / take),
    skip,
    take,
    nextPage,
    prevPage,
    setSkip,
  };
};

export default usePagination;
