import client from './clients';
import { ProfileEditVerificationTypes } from 'gachTaxi-types';

export const updateUserProfile = async (data: ProfileEditVerificationTypes) => {
  try {
    const res = await client.patch('/api/members/info', data);
    return res.data;
  } catch (error) {
    console.log('프로필 업데이트 실패', error);
  }
};
