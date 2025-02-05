import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteBlackList from '@/libs/apis/deleteBlackList.api';

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
