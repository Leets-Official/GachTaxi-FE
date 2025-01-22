import axios from 'axios';
//import client from '../clients';

export const getChatMessages = async (roomId: number | null) => {
  if (!roomId) {
    throw new Error('roomId is required');
  }

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/chat/${roomId}`,
    );
    console.log('res:', res.data);
    return res.data;
  } catch (error) {
    throw new Error(`Error get ChatMessage: ${error}`);
  }
};
