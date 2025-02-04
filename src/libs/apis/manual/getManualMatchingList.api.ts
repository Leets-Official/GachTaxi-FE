import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { RoomResponse } from 'gachTaxi-types';

const getManualMatchingList = async ({
  pageNumber = 0,
  pageSize = 10,
}: {
  pageNumber?: number;
  pageSize?: number;
}) => {
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });

  const res: AxiosResponse<RoomResponse> = await client.get(
    `/api/matching/manual/list?${params}`,
  );
  return res.data;
};

export default getManualMatchingList;
