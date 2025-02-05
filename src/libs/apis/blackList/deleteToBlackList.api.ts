import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { BasicBlackListResponse } from 'gachTaxi-types';

const deleteToBlackList = async (receiverId: number) => {
  const res: AxiosResponse<BasicBlackListResponse> = await client.delete(
    `/api/blacklists?receiverId=${receiverId}`,
  );
  return res.data;
};

export default deleteToBlackList;
