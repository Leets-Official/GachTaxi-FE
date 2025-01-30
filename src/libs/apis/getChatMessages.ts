import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getChatMessages = async (
  roomId: number | null,
  lastMessageTimeStamp: string | null = null,
  pageNumber: number = 0,
): Promise<ChatMessagesFromServerFull> => {
  try {
    const res = await axios.get(`${baseUrl}/api/chat/${roomId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        lastMessageTimeStamp,
        pageNumber,
        pageSize: 1000,
      },
    });
    const data = res.data.data;
    return data;
  } catch (error) {
    throw new Error(`Error get ChatMessage: ${error}`);
  }
};
