import useInfiniteScroll from '@/hooks/queries/useInfiniteScroll';
import getToBlackList from '@/libs/apis/blacklist/getToBlackList.api';

const fetchBlackList = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const pageSize = 10;
  const res = await getToBlackList({ pageNum: pageParam, pageSize });
  return res.data;
};

const useBlackList = () => {
  return useInfiniteScroll({
    queryKey: ['blackList'],
    fetchFunction: fetchBlackList,
  });
};

export default useBlackList;
