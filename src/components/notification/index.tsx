import FriendRequestNotification from '@/components/notification/FriendRequestNotification';
import MatchingNotification from '@/components/notification/MatchingNotification';

const NotificationList = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <FriendRequestNotification />
      <MatchingNotification />
    </div>
  );
};

export default NotificationList;
