import z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneVerificationSchema } from '../../libs/schemas/auth';
import { PhoneVerificationTypes } from 'gachTaxi-types';
import Input from '../commons/Input';
import Button from '../commons/Button';
import useVerificationTimer from '../../hooks/useVerificationTimer';
import { formatTimeLikeTimer } from '@/utils';

const TIMER_DURATION = 300;

const PhoneVerification = ({
  isPhoneVerified,
  setIsPhoneVerified,
  setPhoneNumInfo,
}: {
  isPhoneVerified: boolean;
  setIsPhoneVerified: (value: boolean) => void;
  setPhoneNumInfo: (value: string) => void;
}) => {
  const { timer, startTimer } = useVerificationTimer(TIMER_DURATION);
  const signUpForm = useForm<z.infer<typeof phoneVerificationSchema>>({
    resolver: zodResolver(phoneVerificationSchema),
    defaultValues: {
      phoneNumber: '',
    },
    mode: 'onBlur',
  });

  // 이메일 인증 API 호출
  const handleSubmitToSignUp: SubmitHandler<PhoneVerificationTypes> = (
    data,
  ) => {
    // 이메일 전송 로직 구현 (예: API 호출)
    setIsPhoneVerified(true);
    setPhoneNumInfo(data.phoneNumber);
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
        name="phoneNumber"
        label="전화번호"
        type="text"
        placeholder="전화번호를 입력해주세요"
      />
      <Button
        variant="primary"
        type="submit"
        className="mt-3"
        disabled={timer === 0 && isPhoneVerified} // 타이머 종료 시 버튼 비활성화
      >
        {isPhoneVerified
          ? timer > 0
            ? `인증번호 다시 받기 (${formatTimeLikeTimer(timer)})`
            : '시간 초과'
          : '인증번호 받기'}
      </Button>
    </form>
  );
};

export default PhoneVerification;
