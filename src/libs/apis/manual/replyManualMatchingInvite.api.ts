import client from '@/libs/apis/clients';

const replyManualMatchingInvite = async (
  matchingRoomId: number,
  notificationId: string,
  status: 'ACCEPT' | 'REJECT',
) => {
  const res = await client.post('/api/matching/manual/invite/reply', {
    matchingRoomId,
    notificationId,
    status,
  });
  return res.data;
};

export default replyManualMatchingInvite;
