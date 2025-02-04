import deleteBlackList from '@/libs/apis/blacklist/deleteBlackList.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteBlackList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (receiverId: number) => {
      const res = await deleteBlackList(receiverId);
      return res;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blackList'] });
    },
  });
};

export default useDeleteBlackList;
