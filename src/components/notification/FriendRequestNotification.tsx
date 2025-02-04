import Button from '@/components/commons/Button';
import ERROR_MESSAGE from '@/constants/errorMessage.constant';
import { useToast } from '@/contexts/ToastContext';
import useDeleteNotification from '@/hooks/mutations/useDeleteNotification';
import useFriendReply from '@/hooks/mutations/useFriendReply';
import useInviteReply from '@/hooks/mutations/useInviteReply';
import { NotificationResponse } from '@gachTaxi-types';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

interface FriendRequestNotificationProps {
  senderId: number;
  content: string;
  matchingRoomId: number;
  notificationId: string;
  type: 'FRIEND_REQUEST' | 'MATCH_INVITE';
}

const FriendRequestNotification = ({
  senderId,
  content,
  matchingRoomId,
  notificationId,
  type,
}: FriendRequestNotificationProps) => {
  const { openToast } = useToast();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: replyFriend } = useFriendReply();
  const { mutate: replyInite } = useInviteReply();
  const queryClient = useQueryClient();

  // 낙관적 업데이트용 함수
  const handleQueryData = () => {
    queryClient.setQueryData(
      ['notification'],
      (oldData: InfiniteData<NotificationResponse['data']>) => ({
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          response: page.response.filter(
            (notification) => notification.notificationId !== notificationId,
          ),
        })),
      }),
    );
  };

  const acceptFriendRequest = () => {
    handleQueryData();

    const data = {
      memberId: senderId,
      notificationId,
      status: 'ACCEPTED' as const,
    };
    replyFriend(data, {
      onSuccess: (response) => {
        openToast(response.message, 'success');
      },
      onError: () => {
        openToast(ERROR_MESSAGE, 'error');
      },
    });
  };

  const handleDeleteNotification = () => {
    handleQueryData();

    deleteNotification(notificationId, {
      onSuccess: (response) => {
        openToast(response.message, 'success');
      },
      onError: () => {
        openToast(ERROR_MESSAGE, 'error');
      },
    });
  };

  const handleAcceptInvite = () => {
    handleQueryData();

    const data = { matchingRoomId, notificationId, status: 'ACCEPT' as const };
    replyInite(data, {
      onSuccess: (response) => {
        openToast(response.message, 'success');
      },
      onError: () => {
        openToast(ERROR_MESSAGE, 'error');
      },
    });
  };

  const handleRejectInvite = () => {
    handleQueryData();

    const data = { matchingRoomId, notificationId, status: 'REJECT' as const };
    replyInite(data, {
      onSuccess: (response) => {
        openToast(response.message, 'success');
      },
      onError: () => {
        openToast(ERROR_MESSAGE, 'error');
      },
    });
  };

  const rejectFriendRequest = () => {
    handleQueryData();

    const data = {
      memberId: senderId,
      notificationId,
      status: 'REJECTED' as const,
    };
    replyFriend(data, {
      onSuccess: (response) => {
        openToast(response.message, 'success');
      },
      onError: () => {
        openToast(ERROR_MESSAGE, 'error');
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
          handleDeleteNotification();
        }
      }}
    >
      <p className="font-bold text-captionHeader">{content}</p>
      <div className="flex justify-end h-[30px] gap-2">
        <Button
          className="w-[92px] h-full"
          onClick={
            type === 'FRIEND_REQUEST' ? acceptFriendRequest : handleAcceptInvite
          }
        >
          수락
        </Button>
        <Button
          variant="secondary"
          className="w-[92px] h-full border-primary text-primary border-[1px]"
          onClick={
            type === 'FRIEND_REQUEST' ? rejectFriendRequest : handleRejectInvite
          }
        >
          거절
        </Button>
      </div>
    </motion.div>
  );
};

export default FriendRequestNotification;
