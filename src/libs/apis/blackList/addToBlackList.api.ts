import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { BasicBlackListResponse } from 'gachTaxi-types';

const addToBlackList = async (receiverId: number) => {
  const res: AxiosResponse<BasicBlackListResponse> = await client.post(
    `/api/blacklists?receiverId=${receiverId}`,
  );
  return res.data;
};

export default addToBlackList;
