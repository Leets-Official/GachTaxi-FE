import { useMutation, useQueryClient } from '@tanstack/react-query';
import addBlackList from '@/libs/apis/blacklist/addBlackList.api';

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
