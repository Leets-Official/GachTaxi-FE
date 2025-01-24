import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { SignUpFlowResponse, EmailVerificationTypes } from 'gachTaxi-types';

const requestEmailVerification = async (
  data: EmailVerificationTypes,
): Promise<SignUpFlowResponse | undefined> => {
  const res: AxiosResponse<SignUpFlowResponse> = await client.post(
    '/auth/code/mail',
    data,
  );
  return res.data;
};

export default requestEmailVerification;
