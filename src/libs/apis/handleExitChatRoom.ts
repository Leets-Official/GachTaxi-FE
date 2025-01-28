import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const accessToken = import.meta.env.VITE_MASTER_TOKEN;

const handleExitChatRoom = async (roomId: number) => {
  console.log('퇴장 룸넘버', roomId);
  try {
    const response = await axios.delete(`${baseUrl}/api/chat/${roomId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('퇴장 처리', response.data);
    const res = response.data;
    return res;
  } catch (error) {
    throw new Error(`Error get handleExitChatRoom: ${error}`);
  }
};

export default handleExitChatRoom;
