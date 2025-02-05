import client from '@/libs/apis/clients';

export const withdrawUser = async () => {
  try {
    const res = await client.delete('/api/members');
    return res.data;
  } catch (error) {
    throw new Error(`Error post withdraw: ${error}`);
  }
};
