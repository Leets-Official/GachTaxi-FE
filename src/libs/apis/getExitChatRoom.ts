import client from './clients';

const getExitChatRoom = async (roomId: number) => {
  try {
    const chatExitResponse = await client.delete(`/api/chat/${roomId}`);
    return {
      chatExit: chatExitResponse.data,
    };
  } catch (error) {
    throw new Error(`Error get handleExitChatRoom: ${error}`);
  }
};

export default getExitChatRoom;
