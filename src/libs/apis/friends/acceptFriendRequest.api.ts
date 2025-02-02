import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { BasicFriendResponse } from 'gachTaxi-types';

const acceptFriendRequest = async (data: number) => {
  const res: AxiosResponse<BasicFriendResponse> = await client.patch(
    '/api/friends',
    {
      memberId: data,
    },
  );
  return res.data;
};

export default acceptFriendRequest;
