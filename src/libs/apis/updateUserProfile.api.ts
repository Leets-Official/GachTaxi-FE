import client from './clients';
import { ProfileEditVerificationTypes } from 'gachTaxi-types';

export const updateUserProfile = async (data: ProfileEditVerificationTypes) => {
  try {
    console.log(data);
    const res = await client.patch('/api/members/info', data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log('프로필 업데이트 실패', error);
  }
};
