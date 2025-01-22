import BackButton from '@/components/commons/BackButton';
import NotificationList from '@/components/notification';

export interface Notification {
  notificationId: number;
  senderId: string;
  receiverId: string;
  notificationType: string;
  notificationStatus: string;
  title: string;
  content: string;
  createdAt: string;
}

const NotificationPage = () => {
  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal max-h-screen">
      <BackButton />
      <h1 className="text-header font-bold">알림</h1>
      <NotificationList />
    </section>
  );
};

export default NotificationPage;
