import EmptyView from '@/components/emptyView';
import FriendRequestNotification from '@/components/notification/FriendRequestNotification';
import useNotification from '@/hooks/queries/useNotification';

const NotificationList = () => {
  const { data } = useNotification();
  const notificationList = data.pages.flatMap((page) => page.content);

  return (
    <div className="flex flex-col gap-4 w-full h-full flex-1">
      {notificationList.length > 0 ? (
        notificationList.map((noti) => {
          return <FriendRequestNotification />;
        })
      ) : (
        <EmptyView>알림이 없습니다.</EmptyView>
      )}
    </div>
  );
};

export default NotificationList;
