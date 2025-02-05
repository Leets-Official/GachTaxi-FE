import replyManualMatchingInvite from '@/libs/apis/manual/replyManualMatchingInvite.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useInviteReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      matchingRoomId,
      notificationId,
      status,
    }: {
      matchingRoomId: number;
      notificationId: string;
      status: 'ACCEPT' | 'REJECT';
    }) => {
      const res = await replyManualMatchingInvite(
        matchingRoomId,
        notificationId,
        status,
      );
      return res;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
      queryClient.invalidateQueries({ queryKey: ['friend'] });
    },
  });
};

export default useInviteReply;
