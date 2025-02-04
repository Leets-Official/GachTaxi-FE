import client from '@/libs/apis/clients';

const exitManualMatchingRoom = async (roomId: number) => {
  const res = await client.patch(`/api/matching/manual/exit/${roomId}`);
  return res.data;
};

export default exitManualMatchingRoom;
