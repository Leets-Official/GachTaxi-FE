import deleteBlackList from '@/libs/apis/blackList/deleteBlackList.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteBlackList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (receiverId: number) => {
      const res = await deleteBlackList(receiverId);
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

export default useDeleteBlackList;
