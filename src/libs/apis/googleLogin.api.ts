import handleAxiosError from '@/libs/apis/axiosError.api';
import client from '@/libs/apis/clients';

const googlelogin = async (authCode: string) => {
  try {
    const response = await client.post('/auth/login/google', {
      authCode,
    });
    return response.data;
  } catch (e) {
    handleAxiosError(e);
  }
};

export default googlelogin;
