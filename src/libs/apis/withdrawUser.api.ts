import client from '@/libs/apis/clients';

//현재 탈퇴하기 api는 나오지 않았는데 로직만 적어두었습니다
export const withdrawUser = async () => {
  try {
    const res = await client.post('/auth/logout');
    return res.data;
  } catch (error) {
    throw new Error(`Error post withdraw: ${error}`);
  }
};
