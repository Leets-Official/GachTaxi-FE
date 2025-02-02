import useInfiniteScroll from '@/hooks/queries/useInfiniteScroll';
import getFriends from '@/libs/apis/friends/getFriends.api';

const fetchBlackList = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const pageSize = 10;
  const res = await getFriends({ pageNum: pageParam, pageSize });
  return res.data;
};

const useBlackList = () => {
  return useInfiniteScroll({
    queryKey: ['blackList'],
    fetchFunction: fetchBlackList,
  });
};

export default useBlackList;
