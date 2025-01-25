import client from '@/libs/apis/clients';
import { NotificationResponse } from '@gachTaxi-types';
import { AxiosResponse } from 'axios';

const getNotifications = async ({
  pageNum = 1,
  pageSize = 10,
}: {
  pageNum?: number;
  pageSize?: number;
}) => {
  const params = new URLSearchParams({
    pageNum: pageNum.toString(),
    pageSize: pageSize.toString(),
  });

  const res: AxiosResponse<NotificationResponse> = await client.get(
    `/api/notifications?${params}`,
  );
  return res.data; // NotificationResponse의 data 부분 반환
};

export default getNotifications;
