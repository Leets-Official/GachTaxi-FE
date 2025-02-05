import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { BasicBlackListResponse } from 'gachTaxi-types';

const deleteBlackList = async (receiverId: number) => {
  const res: AxiosResponse<BasicBlackListResponse> = await client.delete(
    `/api/blacklists/${receiverId}`,
  );
  return res.data;
};

export default deleteBlackList;
