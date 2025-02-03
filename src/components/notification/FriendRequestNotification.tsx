import Button from '@/components/commons/Button';
import { useToast } from '@/contexts/ToastContext';
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
  console.log(senderId);

  return (
    <motion.div
      className="bg-secondary rounded-box w-full h-[101px] flex flex-col p-vertical justify-between"
      drag="x"
      dragElastic={0.4}
      dragConstraints={{ left: 0, right: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 30 }}
      exit={{ opacity: 0, height: 0, margin: 0, transition: { duration: 0.6 } }}
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
        <Button className="w-[92px] h-full">수락</Button>
        <Button
          variant="secondary"
          className="w-[92px] h-full border-primary text-pri border-[1px]"
        >
          거절
        </Button>
      </div>
    </motion.div>
  );
};

export default FriendRequestNotification;
