import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { BlackListResponse } from 'gachTaxi-types';

const getBlackList = async ({
  pageNum = 0,
  pageSize = 10,
}: {
  pageNum?: number;
  pageSize?: number;
}) => {
  const params = new URLSearchParams({
    pageNum: pageNum.toString(),
    pageSize: pageSize.toString(),
  });
  const res: AxiosResponse<BlackListResponse> = await client.get(
    `/api/blacklists?${params}`,
  );
  return res.data;
};

export default getBlackList;
