import client from './clients';

export const updateUserProfile = async (formData: FormData) => {
  try {
    const res = await client.patch('api/members/info', formData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log('프로필 업데이트 실패', error);
  }
};
