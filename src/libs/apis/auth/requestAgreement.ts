import client from '@/libs/apis/clients';
import { AxiosResponse } from 'axios';
import { AgreementsTypes, SignUpFlowResponse } from 'gachTaxi-types';

const requestAgreement = async (
  data: AgreementsTypes,
): Promise<SignUpFlowResponse | undefined> => {
  const res: AxiosResponse<SignUpFlowResponse> = await client.patch(
    '/auth/agreement',
    data,
  );
  return res.data;
};

export default requestAgreement;
