import Modal from '@/components/modal';
import Button from '../commons/Button';
import { useModal } from '@/contexts/ModalContext';
import Input from '../commons/Input';
import useUserStore from '@/store/useUserStore';
import { z } from 'zod';
import { accountNumberVerificationSchema } from '@/libs/schemas/auth';
import { AccountNumberVerificationTypes } from 'gachTaxi-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { useToast } from '@/contexts/ToastContext';
import handleAxiosError from '@/libs/apis/axiosError.api';
import { getAccountNumber } from '@/libs/apis/getAccountNumber.api';

const AccountNumberModal = () => {
  const { closeModal } = useModal();

  const { user } = useUserStore();

  const profileForm = useForm<z.infer<typeof accountNumberVerificationSchema>>({
    resolver: zodResolver(accountNumberVerificationSchema),
    defaultValues: {
      accountNumber: user?.accountNumber || '',
    },
    mode: 'onSubmit',
  });
  const { setUser } = useUserStore();
  const { openToast } = useToast();
  const accountNumber = useWatch({
    control: profileForm.control,
    name: 'accountNumber',
  });

  const handleSubmitChange: SubmitHandler<
    AccountNumberVerificationTypes
  > = async () => {
    try {
      const updateData = profileForm.getValues();

      const res = await getAccountNumber(updateData);
      if (res?.code === 200) {
        const userData = res?.data;
        setUser(userData);
        openToast(res.message, 'success');
        closeModal();
      }
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      openToast(errorMessage, 'error');
    }
  };

  return (
    <>
      <Modal.Header className="font-bold text-header mt-4 px-3">
        계좌번호
      </Modal.Header>
      <Modal.Content className="font-medium text-captionHeader text-textDarkGray">
        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={profileForm.handleSubmit(
            handleSubmitChange as SubmitHandler<
              z.infer<typeof accountNumberVerificationSchema>
            >,
          )}
        >
          <Input
            control={profileForm.control}
            name="accountNumber"
            placeholder="계좌번호를 입력해주세요"
            type="text"
          />

          <Button type="submit" className="w-full mt-8">
            {accountNumber ? '변경하기' : '확인'}
          </Button>
        </form>
      </Modal.Content>
    </>
  );
};

export default AccountNumberModal;
