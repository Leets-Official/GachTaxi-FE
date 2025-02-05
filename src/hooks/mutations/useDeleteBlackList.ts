import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteToBlackList from '@/libs/apis/blacklist/deleteToBlackList.api';

const useDeleteBlackList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (receiverId: number) => {
      const res = await deleteToBlackList(receiverId);
      return res;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blackList'] });
    },
  });
};

export default useDeleteBlackList;
