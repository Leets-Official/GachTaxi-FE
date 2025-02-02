import client from './clients';

const handleExitChatRoom = async (roomId: number) => {
  try {
    const response = await client.delete(`/api/chat/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error get handleExitChatRoom: ${error}`);
  }
};

export default handleExitChatRoom;
