import getNotifications from '@/libs/apis/notification/getNotifications.api';
import useInfiniteScroll from '@/hooks/queries/useInfiniteScroll';

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
  return useInfiniteScroll({
    queryKey: ['notification'],
    fetchFunction: fetchNotifications,
  });
};

export default useNotification;
