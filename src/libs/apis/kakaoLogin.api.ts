import client from '@/libs/apis/clients';

export const kakaoLogin = async (authCode: string) => {
  try {
    const response = await client.post('/auth/login/kakao', { authCode });
    return response;
  } catch (error) {
    console.error('Kakao login API 호출 실패:', error);
    throw error;
  }
};
