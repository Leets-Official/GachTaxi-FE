import client from './clients';

const handleExitChatRoom = async (roomId: number) => {
  try {
    const chatExitResponse = await client.delete(`/api/chat/${roomId}`);
    const matchingExitResponse = await client.patch(
      `/api/matching/manual/exit/${roomId}`,
    );
    return {
      chatExit: chatExitResponse.data,
      matchingExit: matchingExitResponse.data,
    };
  } catch (error) {
    throw new Error(`Error get handleExitChatRoom: ${error}`);
  }
};

export default handleExitChatRoom;
