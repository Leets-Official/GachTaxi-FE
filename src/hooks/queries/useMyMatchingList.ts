import useInfiniteScroll from '@/hooks/queries/useInfiniteScroll';
import getMyMatchingList from '@/libs/apis/manual/getMyMatchingList.api';

const fetchMyMatchingList = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}) => {
  const pageSize = 10;
  const res = await getMyMatchingList({ pageNumber: pageParam, pageSize });
  return res.data;
};

const useMyMatchingList = () => {
  return useInfiniteScroll({
    queryKey: ['myMatchingList'],
    fetchFunction: fetchMyMatchingList,
  });
};

export default useMyMatchingList;
