import BackButton from '@/components/commons/BackButton';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { friendRequestSchema } from '@/libs/schemas/request';
import { zodResolver } from '@hookform/resolvers/zod';
import { FriendRequestTypes } from 'gachTaxi-types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useToast } from '@/contexts/ToastContext';
import { z } from 'zod';
import requestFriends from '@/libs/apis/friends/requestFriend.api';
import useRequestStatus from '@/hooks/useRequestStatus';
import ERROR_MESSAGE from '@/constants/errorMessage.constant';

const FriendRequestPage = () => {
  const friendRequestForm = useForm<z.infer<typeof friendRequestSchema>>({
    resolver: zodResolver(friendRequestSchema),
    defaultValues: {
      nickName: '',
    },
    mode: 'onSubmit',
  });

  const { openToast } = useToast();
  const { status, setPending, setSuccess, setError } = useRequestStatus();

  const handleSubmitRequest: SubmitHandler<FriendRequestTypes> = async (
    data,
  ) => {
    setPending();
    try {
      const res = await requestFriends(data);
      if (res.code >= 200 && res.code < 300) {
        openToast(res.message, 'success');
      }
      setSuccess();
    } catch (e) {
      setError();
      console.error(e);
      openToast(ERROR_MESSAGE, 'error');
    }
  };

  return (
    <section className="flex-1 w-full flex flex-col gap-[48px] p-horizontal max-h-screen">
      <BackButton />

      <h1 className="text-header font-bold">친구 요청</h1>
      <form
        className="flex flex-col gap-2 w-full"
        onSubmit={friendRequestForm.handleSubmit(handleSubmitRequest)}
      >
        <Input
          control={friendRequestForm.control}
          name="nickName"
          label="친구 닉네임"
          placeholder="추가할 친구의 닉네임을 입력해주세요"
          type="text"
        />

        <Button
          type="submit"
          className="w-full mt-8"
          isLoading={status === 'pending'}
        >
          요청하기
        </Button>
      </form>
    </section>
  );
};

export default FriendRequestPage;
