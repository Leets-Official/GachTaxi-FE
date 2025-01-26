import client from '@/libs/apis/clients';

const googlelogin = async (authCode: string) => {
  const response = await client.post('/auth/login/google', {
    authCode,
  });
  return response.data;
};

export default googlelogin;
