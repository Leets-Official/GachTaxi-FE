import client from './clients';

export const getChatMessages = async (
  roomId: number | null,
  lastMessageTimeStamp: string | null = null,
  pageNumber: number = 0,
): Promise<ChatMessagesFromServerFull> => {
  try {
    const res = await client.get(`/api/chat/${roomId}`, {
      params: {
        lastMessageTimeStamp,
        pageNumber,
        pageSize: 1000,
      },
    });
    return res.data.data;
  } catch (error) {
    throw new Error(`Error get ChatMessage: ${error}`);
  }
};
