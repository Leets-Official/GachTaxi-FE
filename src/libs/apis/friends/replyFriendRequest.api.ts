import client from '@/libs/apis/clients';

const replyFriendRequest = async (
  memberId: number,
  notificationId: string,
  status: 'ACCEPTED' | 'REJECTED',
) => {
  const res = await client.patch('/api/friends', {
    memberId,
    notificationId,
    status,
  });
  return res.data;
};

export default replyFriendRequest;
