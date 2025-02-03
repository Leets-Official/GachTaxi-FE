import client from '@/libs/apis/clients';

const deleteNotification = async (notificationId: string) => {
  const res = await client.delete(`/api/notifications/${notificationId}`);
  return res.data;
};

export default deleteNotification;
