import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { BasicFriendResponse } from 'gachTaxi-types';

const rejectFriendRequest = async (memberId: number) => {
  const res: AxiosResponse<BasicFriendResponse> = await client.delete(
    `/api/friends/${memberId}`,
  );
  return res.data;
};

export default rejectFriendRequest;
