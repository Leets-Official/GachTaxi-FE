import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import getNotifications from '@/libs/apis/notification/getNotifications.api';

const fetchNotifications = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}) => {
  const pageSize = 10;
  const res = await getNotifications({ pageNum: pageParam, pageSize });
  return res.data;
};

const useNotification = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['notification'],
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      fetchNotifications({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.pageable.last ? undefined : lastPage.pageable.pageNumber + 1,
    staleTime: 30000,
  });
};

export default useNotification;
