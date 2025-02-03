import client from '../clients';

const postBlacklist = async (senderId: number) => {
  try {
    const res = await client.post(`/api/blacklists?receiverId=${senderId}`);
    return res.data;
  } catch (error) {
    throw new Error(`Error post Balcklist: ${error}`);
  }
};

export default postBlacklist;
