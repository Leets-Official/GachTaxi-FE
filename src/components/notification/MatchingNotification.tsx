import RouteSettingIcon from '@/assets/icon/smallRouteChangeIcon.svg?react';
import { MatchStartPayload } from '@gachTaxi-types';
import formatToKoreanTime from '@/utils/formatToKoreanTIme';
import { motion } from 'framer-motion';
import useDeleteNotification from '@/hooks/mutations/useDeleteNotification';
import { useToast } from '@/contexts/ToastContext';

interface MatchingNotificationProps {
  content: string;
  createdAt: string;
  notificationId: string;
  payload: MatchStartPayload;
}

const MatchingNotification = ({
  content,
  createdAt,
  notificationId,
  payload,
}: MatchingNotificationProps) => {
  const { openToast } = useToast();
  const { mutate: deleteNotification } = useDeleteNotification();

  return (
    <motion.div
      className="min-h-[120px] h-[120spx] bg-secondary rounded-box p-vertical flex flex-col gap-2 w-full"
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
      <div className="flex items-center justify-between w-full">
        <p className="font-bold text-captionHeader">{content}</p>
        <span className="font-medium text-body">
          {formatToKoreanTime(createdAt)}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-1">
        <RouteSettingIcon />
        <div className="relative top-[-2px]">
          <p className="font-medium text-captionHeader">
            {payload.startLocationName}
          </p>
          <p className="font-medium text-captionHeader">
            {payload.endLocationName}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchingNotification;
