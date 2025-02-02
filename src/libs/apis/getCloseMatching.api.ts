import client from './clients';

export const getCloseMatching = async (roomId: number) => {
  try {
    const res = await client.post(`/api/matching/auto/cancel`, {
      roomId,
    });
    console.log(res);
    return {
      matchingExit: res.data,
    };
  } catch (error) {
    throw new Error(`Error in handleExitMatch: ${error}`);
  }
};
