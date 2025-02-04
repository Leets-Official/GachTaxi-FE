import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { BasicMatchingResponse, ManualMatchingTypes } from 'gachTaxi-types';

const createManualMatchingRoom = async (data: ManualMatchingTypes) => {
  const res: AxiosResponse<BasicMatchingResponse> = await client.post(
    '/api/matching/manual/creation',
    data,
  );
  return res.data;
};

export default createManualMatchingRoom;
