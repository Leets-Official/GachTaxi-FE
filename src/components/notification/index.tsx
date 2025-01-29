import EmptyView from '@/components/emptyView';
import FriendRequestNotification from '@/components/notification/FriendRequestNotification';
import MatchingNotification from '@/components/notification/MatchingNotification';
import useNotification from '@/hooks/queries/useNotification';

const NotificationList = () => {
  const { data } = useNotification();
  const notificationList = data?.pages?.flatMap((page) => page.response) || [];

  return (
    <div className="flex flex-col gap-4 w-full h-full flex-1">
      {notificationList.length > 0 ? (
        notificationList.map((notification) =>
          notification.type === 'FRIEND_REQUEST' ? (
            <FriendRequestNotification key={notification.notificationId} />
          ) : (
            <MatchingNotification key={notification.notificationId} />
          ),
        )
      ) : (
        <EmptyView>알림이 없습니다.</EmptyView>
      )}
    </div>
  );
};

export default NotificationList;
