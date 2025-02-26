import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { authCodeVerificationSchema } from '@/libs/schemas/auth';
import { AuthCodeTypes } from 'gachTaxi-types';
import Input from '../commons/Input';
import Button from '../commons/Button';
import { useModal } from '../../contexts/ModalContext';
import AgreementModal from '../modal/AgreementModal';
import { verifyAuthCode } from '@/libs/apis/auth';
import { useToast } from '@/contexts/ToastContext';
import handleAxiosError from '@/libs/apis/axiosError.api';
import useRequestStatus from '@/hooks/useRequestStatus';
import ERROR_MESSAGE from '@/constants/errorMessage.constant';

const AuthCodeVerification = ({ emailInfo }: { emailInfo: string }) => {
  const { openModal } = useModal();
  const { openToast } = useToast();

  const authForm = useForm<z.infer<typeof authCodeVerificationSchema>>({
    resolver: zodResolver(authCodeVerificationSchema),
    defaultValues: {
      authCode: '',
      email: emailInfo!,
    },
    mode: 'onSubmit',
  });
  const { status, setPending, setSuccess, setError } = useRequestStatus();

  const handleSubmitToAuth: SubmitHandler<AuthCodeTypes> = async (data) => {
    setPending();
    try {
      const res = await verifyAuthCode(data);
      if (res?.code === 200) {
        setSuccess();
        openToast(res.message, 'success');
        openModal(<AgreementModal />);
      }
    } catch (error: unknown) {
      setError();
      const errorMessage = handleAxiosError(error);
      console.error(errorMessage);
      openToast(ERROR_MESSAGE, 'error');
    }
  };

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={authForm.handleSubmit(handleSubmitToAuth)}
    >
      <Input
        control={authForm.control}
        name="authCode"
        label="인증번호"
        type="text"
        placeholder="인증번호를 입력해주세요"
      />
      <Button type="submit" className="mt-3" isLoading={status === 'pending'}>
        시작하기
      </Button>
    </form>
  );
};

export default AuthCodeVerification;
