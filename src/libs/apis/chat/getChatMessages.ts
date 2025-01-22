import axios from 'axios';
//import client from '../clients';

export const getChatMessages = async (roomId: number | null) => {
  if (!roomId) {
    throw new Error('roomId is required');
  }

  try {
    const res = await axios.get(
      `https://6140-2406-5900-102a-70c2-6568-cdf4-9ae9-b838.ngrok-free.app/api/chat/${roomId}`,
    );
    console.log('res:', res.data);
    return res.data;
  } catch (error) {
    throw new Error(`Error get ChatMessage: ${error}`);
  }
};
