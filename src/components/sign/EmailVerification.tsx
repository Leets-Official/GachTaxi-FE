import z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailVerificationSchema } from '../../libs/schemas/auth';
import { EmailVerificationTypes } from 'gachTaxi-types';
import Input from '../commons/Input';
import Button from '../commons/Button';
import useVerificationTimer from '../../hooks/useVerificationTimer';
import { formatTimeLikeTimer } from '../../utils';

const TIMER_DURATION = 300;

const EmailVerification = ({
  isEmailVerified,
  setIsEmailVerified,
  setEmailInfo,
}: {
  isEmailVerified: boolean;
  setIsEmailVerified: (value: boolean) => void;
  setEmailInfo: (value: string) => void;
}) => {
  const { timer, startTimer } = useVerificationTimer(TIMER_DURATION);
  const signUpForm = useForm<z.infer<typeof emailVerificationSchema>>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  // 이메일 인증 API 호출
  const handleSubmitToSignUp: SubmitHandler<EmailVerificationTypes> = (
    data,
  ) => {
    // 이메일 전송 로직 구현 (예: API 호출)
    setIsEmailVerified(true);
    setEmailInfo(data.email);
    startTimer(); // 타이머 시작
    console.table(data);
  };

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={signUpForm.handleSubmit(handleSubmitToSignUp)}
    >
      <Input
        control={signUpForm.control}
        name="email"
        label="이메일"
        type="email"
        placeholder="gachon.ac 이메일을 입력해주세요"
      />
      <Button
        variant="primary"
        type="submit"
        className="mt-3"
        disabled={timer === 0 && isEmailVerified} // 타이머 종료 시 버튼 비활성화
      >
        {isEmailVerified
          ? timer > 0
            ? `인증번호 다시 받기 (${formatTimeLikeTimer(timer)})`
            : '시간 초과'
          : '인증번호 받기'}
      </Button>
    </form>
  );
};

export default EmailVerification;
