import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { AcceptFriend, BasicFriendResponse } from 'gachTaxi-types';

const acceptFriendRequest = async (data: AcceptFriend) => {
  const res: AxiosResponse<BasicFriendResponse> = await client.patch(
    '/api/friends',
    data,
  );
  return res.data;
};

export default acceptFriendRequest;
