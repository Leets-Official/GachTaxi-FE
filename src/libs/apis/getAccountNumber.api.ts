import client from './clients';
import { AccountNumberVerificationTypes } from 'gachTaxi-types';

export const getAccountNumber = async (
  data: AccountNumberVerificationTypes,
) => {
  try {
    const res = await client.post('/api/accounts', data);
    return res.data;
  } catch (error) {
    console.log('프로필 업데이트 실패', error);
  }
};
