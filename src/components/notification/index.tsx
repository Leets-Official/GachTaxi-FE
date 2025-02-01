import EmptyView from '@/components/emptyView';
import FriendRequestNotification from '@/components/notification/FriendRequestNotification';
import MatchingNotification from '@/components/notification/MatchingNotification';
import useNotification from '@/hooks/queries/useNotification';
import { AnimatePresence } from 'framer-motion';

const NotificationList = () => {
  const { data } = useNotification();
  const notificationList = data?.pages?.flatMap((page) => page.response) || [];

  return (
    <div className="flex flex-col gap-4 w-full h-full flex-1">
      <AnimatePresence>
        {notificationList.length > 0 ? (
          notificationList.map((notification) =>
            notification.type === 'FRIEND_REQUEST' ? (
              <FriendRequestNotification
                key={notification.notificationId}
                notificationId={notification.notificationId}
                senderId={notification.payload.senderId}
                content={notification.content}
              />
            ) : (
              <MatchingNotification
                key={notification.notificationId}
                notificationId={notification.notificationId}
                content={notification.content}
                createdAt={notification.createdAt}
                payload={notification.payload}
              />
            ),
          )
        ) : (
          <EmptyView>알림이 없습니다.</EmptyView>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationList;
