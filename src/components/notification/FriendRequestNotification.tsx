import Button from '@/components/commons/Button';
import { useToast } from '@/contexts/ToastContext';
import useAcceptFriend from '@/hooks/mutations/useAcceptFriend';
import useDeleteFriend from '@/hooks/mutations/useDeleteFriend';
import useDeleteNotification from '@/hooks/mutations/useDeleteNotification';
import { motion } from 'framer-motion';

interface FriendRequestNotificationProps {
  senderId: number;
  content: string;
  notificationId: string;
}

const FriendRequestNotification = ({
  senderId,
  content,
  notificationId,
}: FriendRequestNotificationProps) => {
  const { openToast } = useToast();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: acceptFriend } = useAcceptFriend();
  const { mutate: rejectFriend } = useDeleteFriend();

  const acceptFriendRequest = () => {
    acceptFriend(senderId, {
      onSuccess: (response) => {
        openToast(response.message, 'success');
      },
      onError: (error) => {
        openToast(error.message, 'error');
      },
    });
  };

  const rejectFriendRequest = () => {
    rejectFriend(senderId, {
      onSuccess: (response) => {
        openToast(response.message, 'success');
      },
      onError: (error) => {
        openToast(error.message, 'error');
      },
    });
  };

  return (
    <motion.div
      className="bg-secondary rounded-box w-full h-[101px] flex flex-col p-vertical justify-between"
      drag="x"
      dragElastic={0.4}
      dragConstraints={{ left: 0, right: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 30 }}
      exit={{ opacity: 0 }}
      layout
      onDragEnd={(_event, info) => {
        const isOverOffsetThreshold =
          Math.abs(info.offset.x) > 150 || Math.abs(info.delta.x) > 5;

        const isOverThreshold = isOverOffsetThreshold;
        if (!isOverThreshold) return;

        if (isOverThreshold) {
          deleteNotification(notificationId, {
            onSuccess: (response) => {
              openToast(response.message, 'success');
            },
            onError: (error) => {
              openToast(error.message, 'error');
            },
          });
        }
      }}
    >
      <p className="font-bold text-captionHeader">{content}</p>
      <div className="flex justify-end h-[30px] gap-2">
        <Button className="w-[92px] h-full" onClick={acceptFriendRequest}>
          수락
        </Button>
        <Button
          variant="secondary"
          className="w-[92px] h-full border-primary text-primary border-[1px]"
          onClick={rejectFriendRequest}
        >
          거절
        </Button>
      </div>
    </motion.div>
  );
};

export default FriendRequestNotification;
