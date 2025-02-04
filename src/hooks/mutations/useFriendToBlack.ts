import addBlackList from '@/libs/apis/blacklist/addBlackList.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useFriendToBlack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: number) => {
      const res = await addBlackList(friendId);
      return res;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blackList'] });
    },
  });
};

export default useFriendToBlack;
