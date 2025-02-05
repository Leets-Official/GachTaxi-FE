import { useMutation, useQueryClient } from '@tanstack/react-query';
import addToBlackList from '@/libs/apis/blacklist/addToBlackList.api';

const useFriendToBlack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: number) => {
      const res = await addToBlackList(friendId);
      return res;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blackList'] });
    },
  });
};

export default useFriendToBlack;
