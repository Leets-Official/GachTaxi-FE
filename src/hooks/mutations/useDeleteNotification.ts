import deleteNotification from '@/libs/apis/notification/deleteNotification.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const res = await deleteNotification(notificationId);
      return res;
    },
    onSettled: (_, error) => {
      if (error) {
        queryClient.invalidateQueries({ queryKey: ['notification'] });
        return error;
      } else {
        queryClient.invalidateQueries({ queryKey: ['notification'] });
      }
    },
  });
};

export default useDeleteNotification;
