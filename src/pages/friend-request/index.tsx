import BackButton from '@/components/commons/BackButton';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { friendRequestSchema } from '@/libs/schemas/request';
import { zodResolver } from '@hookform/resolvers/zod';
import { FriendRequestTypes } from 'gachTaxi-types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useToast } from '@/contexts/ToastContext';
import { z } from 'zod';

const FriendRequestPage = () => {
  const friendRequestForm = useForm<z.infer<typeof friendRequestSchema>>({
    resolver: zodResolver(friendRequestSchema),
    defaultValues: {
      nickName: '',
    },
    mode: 'onSubmit',
  });

  const { openToast } = useToast();

  const handleSubmitRequest: SubmitHandler<FriendRequestTypes> = (data) => {
    try {
      console.log(data);
      openToast('친구요청이 전송되었어요', 'success');
      friendRequestForm.setValue('nickName', '');
    } catch (e) {
      console.error(e);
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

        <Button type="submit" className="w-full mt-8">
          요청하기
        </Button>
      </form>
    </section>
  );
};

export default FriendRequestPage;
