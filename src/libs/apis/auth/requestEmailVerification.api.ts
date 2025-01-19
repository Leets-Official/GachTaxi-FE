import handleAxiosError from '@/libs/apis/axiosError.api';
import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { SignUpFlowResponse, EmailVerificationTypes } from 'gachTaxi-types';

const requestEmailVerification = async (data: EmailVerificationTypes) => {
  try {
    const res: AxiosResponse<SignUpFlowResponse> = await client.post(
      '/auth/code/email',
      data,
    );
    return res.data;
  } catch (e: unknown) {
    handleAxiosError(e);
  }
};

export default requestEmailVerification;
