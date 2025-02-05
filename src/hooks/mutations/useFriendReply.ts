import replyFriendRequest from '@/libs/apis/friends/replyFriendRequest.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useFriendReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      memberId,
      notificationId,
      status,
    }: {
      memberId: number;
      notificationId: string;
      status: 'ACCEPTED' | 'REJECTED';
    }) => {
      const res = await replyFriendRequest(memberId, notificationId, status);
      return res;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
  });
};

export default useFriendReply;
