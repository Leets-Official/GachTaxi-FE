import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

interface UseInfiniteScrollQueryProps<T> {
  queryKey: string[];
  fetchFunction: (params: { pageParam: number }) => Promise<T>;
  initialPageParam?: number;
  staleTime?: number;
}

// 무한 스크롤 사용하는 api에서 공통적으로 사용할 훅
const useInfiniteScroll = <T>({
  queryKey,
  fetchFunction,
  initialPageParam = 0,
  staleTime = 30000,
}: UseInfiniteScrollQueryProps<T>) => {
  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchFunction({ pageParam }),
    initialPageParam,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNextPageParam: (lastPage: any) =>
      lastPage.pageable.last ? undefined : lastPage.pageable.pageNumber + 1,
    staleTime,
  });
};

export default useInfiniteScroll;
