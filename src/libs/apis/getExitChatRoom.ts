import client from './clients';

const getExitChatRoom = async (roomId: number) => {
  try {
    const res = await client.delete(`/api/chat/${roomId}`);
    return res.data;
  } catch (error) {
    throw new Error(`Error get handleExitChatRoom: ${error}`);
  }
};

export default getExitChatRoom;
