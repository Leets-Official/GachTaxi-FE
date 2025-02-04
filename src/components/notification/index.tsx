import EmptyView from '@/components/emptyView';
import FriendRequestNotification from '@/components/notification/FriendRequestNotification';
import MatchingNotification from '@/components/notification/MatchingNotification';
import useNotification from '@/hooks/queries/useNotification';
import { useIntersectionObserver } from '@/store/useIntersectionObserver';
import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';
import { AnimatePresence, motion } from 'framer-motion';

const NotificationList = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useNotification();
  const notificationList = data?.pages?.flatMap((page) => page.response) || [];
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  if (isIntersecting && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full flex-1">
      <AnimatePresence>
        {notificationList.length > 0 ? (
          notificationList.map((notification) => (
            <motion.div
              key={notification.notificationId}
              layout
              exit={{ opacity: 0, height: 0 }}
            >
              {notification.type === 'FRIEND_REQUEST' ||
              notification.type === 'MATCH_INVITE' ? (
                <FriendRequestNotification
                  notificationId={notification.notificationId}
                  senderId={notification.payload.senderId}
                  content={notification.content}
                />
              ) : (
                <MatchingNotification
                  notificationId={notification.notificationId}
                  content={notification.content}
                  createdAt={notification.createdAt}
                  payload={notification.payload}
                />
              )}
            </motion.div>
          ))
        ) : (
          <EmptyView>알림이 없습니다.</EmptyView>
        )}
      </AnimatePresence>

      {isFetchingNextPage && (
        <SpinnerIcon width={36} height={36} className="mx-auto spinner mt-5" />
      )}
      <div ref={ref}></div>
    </div>
  );
};

export default NotificationList;
