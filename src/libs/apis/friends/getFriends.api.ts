import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { FriendListResponse } from 'gachTaxi-types';

const getFriends = async ({
  pageNum = 0,
  pageSize = 10,
}: {
  pageNum?: number;
  pageSize?: number;
}) => {
  const res: AxiosResponse<FriendListResponse> = await client.get(
    `/api/friends?pageNum=${pageNum}&pageSize=${pageSize}`,
  );
  return res.data;
};

export default getFriends;
