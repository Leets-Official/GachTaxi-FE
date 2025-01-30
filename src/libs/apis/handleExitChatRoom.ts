import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const accessToken = localStorage.getItem('accessToken');

const handleExitChatRoom = async (roomId: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/chat/${roomId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const res = response.data;
    return res;
  } catch (error) {
    throw new Error(`Error get handleExitChatRoom: ${error}`);
  }
};

export default handleExitChatRoom;
