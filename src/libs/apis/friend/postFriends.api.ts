import client from '../clients';

const postFriends = async (senderName: string) => {
  try {
    const res = await client.post('/api/friends', {
      nickName: senderName,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error post Friends: ${error}`);
  }
};

export default postFriends;
