import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { AuthCodeTypes, SignUpFlowResponse } from 'gachTaxi-types';

const verifyAuthCode = async (data: AuthCodeTypes) => {
  const res: AxiosResponse<SignUpFlowResponse> = await client.patch(
    '/auth/code/mail',
    data,
  );
  return res.data;
};

export default verifyAuthCode;
