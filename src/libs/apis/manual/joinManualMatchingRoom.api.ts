import client from '@/libs/apis/clients';

const joinManualMatchingRoom = async (roomId: number) => {
  const res = await client.post('/api/matching/manual/join', {
    roomId,
  });
  return res.data;
};

export default joinManualMatchingRoom;
