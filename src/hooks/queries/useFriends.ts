import useInfiniteScroll from '@/hooks/queries/useInfiniteScroll';
import getFriends from '@/libs/apis/friends/getFriends.api';

const fetchFriends = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const pageSize = 10;
  console.log(pageParam);
  const res = await getFriends({ pageNum: pageParam, pageSize });
  return res.data;
};

const useFriends = () => {
  return useInfiniteScroll({
    queryKey: ['friend'],
    fetchFunction: fetchFriends,
  });
};

export default useFriends;
