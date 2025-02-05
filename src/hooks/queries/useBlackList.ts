import useInfiniteScroll from '@/hooks/queries/useInfiniteScroll';
import getBlackList from '@/libs/apis/getBlackList.api';

const fetchBlackList = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const pageSize = 10;
  const res = await getBlackList({ pageNum: pageParam, pageSize });
  return res.data;
};

const useBlackList = () => {
  return useInfiniteScroll({
    queryKey: ['blackList'],
    fetchFunction: fetchBlackList,
  });
};

export default useBlackList;
