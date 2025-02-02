import acceptFriendRequest from '@/libs/apis/friends/acceptFriendRequest.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAcceptFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberId: number) => {
      const res = await acceptFriendRequest(memberId);
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

export default useAcceptFriend;
