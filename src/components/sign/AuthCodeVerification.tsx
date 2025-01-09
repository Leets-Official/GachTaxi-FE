import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { authCodeVerificationSchema } from '@/libs/schemas/auth';
import { AuthCodeTypes } from 'gachTaxi-types';
import Input from '../commons/Input';
import Button from '../commons/Button';
import { useModal } from '../../contexts/ModalContext';
import AgreementModal from '../modal/AgreementModal';

const AuthCodeVerification = ({ emailInfo }: { emailInfo: string }) => {
  const { openModal } = useModal();

  const authForm = useForm<z.infer<typeof authCodeVerificationSchema>>({
    resolver: zodResolver(authCodeVerificationSchema),
    defaultValues: {
      authCode: '',
      email: emailInfo!,
    },
    mode: 'onSubmit',
  });

  const handleSubmitToAuth: SubmitHandler<AuthCodeTypes> = (data) => {
    // API 구현 시 추가 구현
    console.table(data);
    // 약관 동의 모달 오픈 로직
    openModal(<AgreementModal />);
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
      <Button type="submit" className="mt-3">
        시작하기
      </Button>
    </form>
  );
};

export default AuthCodeVerification;
