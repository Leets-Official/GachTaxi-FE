import handleAxiosError from '@/libs/apis/axiosError.api';
import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { AuthCodeTypes, SignUpFlowResponse } from 'gachTaxi-types';

const verifyAuthCode = async (data: AuthCodeTypes) => {
  try {
    const res: AxiosResponse<SignUpFlowResponse> = await client.patch(
      '/auth/code/email',
      data,
    );
    return res.data;
  } catch (e: unknown) {
    handleAxiosError(e);
  }
};

export default verifyAuthCode;
