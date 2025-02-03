import client from './clients';

export const getChatNumber = async (roomId: number) => {
  try {
    const res = await client.get(`/api/chat/count/${roomId}`, {});
    return res.data.data.totalParticipantCount;
  } catch (error) {
    throw new Error(`Error get ChatNumber: ${error}`);
  }
};
