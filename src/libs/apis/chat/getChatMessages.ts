import axios from 'axios';
// import client from '../clients';

export const getChatMessages = async (
  roomId: number | null,
  lastMessageTimeStamp: string | null = null,
  pageNumber: number = 0,
  pageSize: number = 5,
): Promise<ChatMessagesFromServerFull> => {
  const accessToken = import.meta.env.VITE_MASTER_TOKEN;

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/chat/${roomId}`,
      {
        headers: {
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          lastMessageTimeStamp,
          pageNumber,
          pageSize,
        },
      },
    );
    const data = res.data.data;
    console.log('getChatMessage에서의 data', data);
    return data;
  } catch (error) {
    throw new Error(`Error get ChatMessage: ${error}`);
  }
};
