import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { BasicFriendResponse, RequestFriend } from 'gachTaxi-types';

const requestFriends = async (data: RequestFriend) => {
  const res: AxiosResponse<BasicFriendResponse> = await client.post(
    '/api/friends',
    data,
  );
  return res.data;
};

export default requestFriends;
