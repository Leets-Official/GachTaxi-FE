import useInfiniteScroll from '@/hooks/queries/useInfiniteScroll';
import getManualMatchingList from '@/libs/apis/manual/getManualMatchingList.api';

const fetchManualMatchingList = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}) => {
  const pageSize = 10;
  const res = await getManualMatchingList({ pageNumber: pageParam, pageSize });
  return res.data;
};

const useManualMatchingList = () => {
  return useInfiniteScroll({
    queryKey: ['matchingList'],
    fetchFunction: fetchManualMatchingList,
  });
};

export default useManualMatchingList;
