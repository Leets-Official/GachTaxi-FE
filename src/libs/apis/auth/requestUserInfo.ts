import client from '@/libs/apis/clients';
import { SignUpFlowResponse, UserInfoVerificationTypes } from 'gachTaxi-types';

const requestUserInfo = async (
  data: UserInfoVerificationTypes,
): Promise<SignUpFlowResponse | undefined> => {
  const res = await client.patch('/auth/supplement', data);
  return res.data;
};

export default requestUserInfo;
