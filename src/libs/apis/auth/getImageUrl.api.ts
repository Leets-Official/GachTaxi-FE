import client from '@/libs/apis/clients';

const getImageUrl = async (data: File, fileName: string) => {
  const res = await client.get('/api/images', {
    params: { fileName },
    data,
  });
  return res.data;
};

export default getImageUrl;
