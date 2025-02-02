import client from '@/libs/apis/clients';
import { UnreadNotificationTypes } from '@gachTaxi-types';
import { AxiosResponse } from 'axios';

const getUnreadNotification = async () => {
  const res: AxiosResponse<UnreadNotificationTypes> = await client.get(
    '/api/notifications/unread',
  );
  return res.data;
};

export default getUnreadNotification;
