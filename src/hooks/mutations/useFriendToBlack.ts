import addBlackList from '@/libs/apis/blackList/addBlackList.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useFriendToBlack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (friendId: number) => {
      const res = await addBlackList(friendId);
      return res;
    },
    onSettled: (_, error) => {
      if (error) {
        queryClient.invalidateQueries({ queryKey: ['blackList'] });
        return error;
      } else {
        queryClient.invalidateQueries({ queryKey: ['blackList'] });
      }
    },
  });
};

export default useFriendToBlack;
