import client from '@/libs/apis/clients';

const getImageUrl = async (data: File) => {
  const res = await client.get('/api/images', {
    data,
  });
  return res.data;
};

export default getImageUrl;
