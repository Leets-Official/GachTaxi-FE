import rejectFriendRequest from '@/libs/apis/friends/rejectFriendRequest.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: number) => {
      const res = await rejectFriendRequest(friendId);
      return res;
    },
    onSettled: (_, error) => {
      if (error) {
        queryClient.invalidateQueries({ queryKey: ['friend'] });
        queryClient.invalidateQueries({ queryKey: ['notification'] });
        return error;
      } else {
        queryClient.invalidateQueries({ queryKey: ['friend'] });
        queryClient.invalidateQueries({ queryKey: ['notification'] });
      }
    },
  });
};

export default useDeleteFriend;
