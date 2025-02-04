import deleteNotification from '@/libs/apis/notification/deleteNotification.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const res = await deleteNotification(notificationId);
      return res;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
  });
};

export default useDeleteNotification;
