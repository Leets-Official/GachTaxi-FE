import client from '@/libs/apis/clients';
import { AutoMatchingTypes } from 'gachTaxi-types';

const startAutoMatching = async (data: AutoMatchingTypes) => {
  const res = await client.post('/api/matching/auto/request', data);
  return res.data;
};

export default startAutoMatching;
