import client from '@/libs/apis/clients';
import { RequestMatchingTypes } from 'gachTaxi-types';

const joinManualMatchingRoom = async (data: RequestMatchingTypes) => {
  const res = await client.post('/api/matching/manual/join', data);
  return res.data;
};

export default joinManualMatchingRoom;
